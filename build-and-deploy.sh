#!/bin/bash

# Build and deploy Vulcano Community to k3s
# This script handles the specific pod cleanup issues with vulcano-community deployment

set -e  # Exit on any error

echo "🚀 Starting Vulcano Community build and deployment..."

# Step 1: Build Docker image
echo "📦 Building Docker image..."
docker build -t vulcano-community:latest .
if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi
echo "✅ Docker image built successfully"

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

# Step 3: Apply Kubernetes manifests
echo "📝 Applying Kubernetes manifests..."
sudo k3s kubectl apply -f k8s/
if [ $? -ne 0 ]; then
    echo "❌ Kubernetes manifest application failed!"
    exit 1
fi

# Step 4: Trigger rollout restart to pick up new image
echo "🔄 Triggering deployment rollout..."
sudo k3s kubectl rollout restart deployment/vulcano-community -n default

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