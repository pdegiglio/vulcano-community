#!/bin/bash

# Build and deploy Vulcano Community to k3s
# This script handles the specific pod cleanup issues with vulcano-community deployment

set -e  # Exit on any error

echo "🚀 Starting Vulcano Community build and deployment..."

# Step 1: Build Docker image with timestamp tag
TIMESTAMP=$(date +%s)
IMAGE_TAG="vulcano-community:$TIMESTAMP"
echo "📦 Building Docker image: $IMAGE_TAG"
docker build -t $IMAGE_TAG .
if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

# Also tag as latest for convenience
docker tag $IMAGE_TAG vulcano-community:latest
echo "✅ Docker image built successfully: $IMAGE_TAG"

# Step 2: Pre-deployment cleanup (Critical for this application)
echo "🧹 Cleaning up existing pods..."
OLD_PODS=$(sudo k3s kubectl get pods -n default | grep vulcano-community | awk '{print $1}' | grep -v NAME || true)

if [ ! -z "$OLD_PODS" ]; then
    echo "🗑️  Found existing pods, force deleting them..."
    echo "$OLD_PODS" | xargs -I {} sudo k3s kubectl delete pod {} --force --grace-period=0
    
    echo "⏳ Waiting for port cleanup (15 seconds)..."
    sleep 15
    
    # Verify pods are gone
    REMAINING_PODS=$(sudo k3s kubectl get pods -n default | grep vulcano-community | grep -v Terminating || true)
    if [ ! -z "$REMAINING_PODS" ]; then
        echo "⚠️  Warning: Some pods still exist, waiting additional 10 seconds..."
        sleep 10
    fi
else
    echo "✅ No existing pods found"
fi

# Step 3: Update deployment with new image tag
echo "📝 Updating deployment with new image: $IMAGE_TAG"
sudo k3s kubectl set image deployment/vulcano-community vulcano-community=$IMAGE_TAG -n default
if [ $? -ne 0 ]; then
    echo "❌ Image update failed! Applying manifests as fallback..."
    sudo k3s kubectl apply -f k8s/
    if [ $? -ne 0 ]; then
        echo "❌ Kubernetes manifest application failed!"
        exit 1
    fi
    # If manifests were applied, still need to update the image
    sudo k3s kubectl set image deployment/vulcano-community vulcano-community=$IMAGE_TAG -n default
fi

# Step 4: The image update triggers rollout automatically, but let's ensure it
echo "🔄 Ensuring deployment rollout with new image..."
sudo k3s kubectl annotate deployment vulcano-community deployment.kubernetes.io/revision- -n default 2>/dev/null || true

# Step 5: Wait for deployment to be ready
echo "⏳ Waiting for deployment to be ready..."
sudo k3s kubectl rollout status deployment/vulcano-community -n default --timeout=300s
if [ $? -ne 0 ]; then
    echo "❌ Deployment failed to become ready!"
    echo "📋 Recent events:"
    sudo k3s kubectl get events -n default --sort-by='.lastTimestamp' | tail -5
    exit 1
fi

# Step 6: Validate deployment
echo "🔍 Validating deployment..."
NEW_POD=$(sudo k3s kubectl get pods -n default | grep vulcano-community | grep Running | awk '{print $1}' | head -1)
if [ -z "$NEW_POD" ]; then
    echo "❌ No running pod found!"
    sudo k3s kubectl get pods -n default | grep vulcano-community
    exit 1
fi

echo "✅ New pod running: $NEW_POD"

# Verify the pod is using the new image
echo "🔍 Verifying pod is using new image..."
POD_IMAGE=$(sudo k3s kubectl get pod $NEW_POD -n default -o jsonpath='{.spec.containers[0].image}')
if [ "$POD_IMAGE" = "$IMAGE_TAG" ]; then
    echo "✅ Pod is using correct image: $POD_IMAGE"
else
    echo "⚠️  Warning: Pod is using different image: $POD_IMAGE (expected: $IMAGE_TAG)"
fi

# Step 7: Test application availability
echo "🌐 Testing application availability..."
sleep 5  # Give the app a moment to start
HTTP_STATUS=$(curl -I https://vulcano-community.ddns.net/ 2>/dev/null | head -n1 | cut -d' ' -f2 || echo "000")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "✅ Application is responding with HTTP 200"
else
    echo "⚠️  Application returned HTTP $HTTP_STATUS (may still be starting)"
fi

echo ""
echo "🎉 Deployment complete!"
echo "🌍 App available at: https://vulcano-community.ddns.net"
echo ""

# Show final status
echo "📊 Final status:"
sudo k3s kubectl get pods -n default | grep vulcano-community
sudo k3s kubectl get ingress vulcano-community-ingress -n default

echo ""
echo "📝 To check logs: sudo k3s kubectl logs $NEW_POD -n default"
echo "🔧 To troubleshoot: sudo k3s kubectl describe pod $NEW_POD -n default"