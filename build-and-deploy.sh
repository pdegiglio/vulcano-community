#!/bin/bash

# Build and deploy Vulcano Community to k3s

echo "Building Docker image..."
docker build -t vulcano-community:latest .

echo "Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/ingress.yaml

echo "Waiting for deployment to be ready..."
kubectl wait --for=condition=available --timeout=300s deployment/vulcano-community

echo "Deployment complete!"
echo "App should be available at: https://vulcano-community.ddns.net"

# Show status
kubectl get pods -l app=vulcano-community
kubectl get ingress vulcano-community-ingress