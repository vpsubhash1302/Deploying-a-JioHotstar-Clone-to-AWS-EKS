#!/bin/bash

# Deploy JioHotstar to EKS cluster
set -e

# Configuration
CLUSTER_NAME="jiohotstar-cluster"
AWS_REGION="us-east-1"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Deploying JioHotstar to EKS cluster...${NC}"

# Check if kubectl is configured for the cluster
echo -e "${YELLOW}Updating kubeconfig for EKS cluster...${NC}"
aws eks update-kubeconfig --region $AWS_REGION --name $CLUSTER_NAME

# Verify cluster connection
echo -e "${YELLOW}Verifying cluster connection...${NC}"
kubectl cluster-info



# Apply Kubernetes manifests
echo -e "${YELLOW}Applying Kubernetes manifests...${NC}"
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/hpa.yaml

# Wait for deployment to be ready
echo -e "${YELLOW}Waiting for deployment to be ready...${NC}"
kubectl wait --for=condition=available --timeout=300s deployment/aws-load-balancer-controller -n kube-system

# Apply ingress (after updating with your domain and certificate)
echo -e "${YELLOW}Applying ingress configuration...${NC}"
kubectl apply -f k8s/ingress.yaml

# Get deployment status
echo -e "${GREEN}Deployment Status:${NC}"
kubectl get pods -n kube-system
kubectl get services -n kube-system
kubectl get ingress -n kube-system

# Get Load Balancer URL
echo -e "${YELLOW}Getting Load Balancer URL...${NC}"
ALB_URL=$(kubectl get ingress jiohotstar-ingress -n kube-system -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
if [ ! -z "$ALB_URL" ]; then
    echo -e "${GREEN}Application URL: http://$ALB_URL${NC}"
else
    echo -e "${YELLOW}Load Balancer is still provisioning. Check again in a few minutes.${NC}"
fi

echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${YELLOW}Useful commands:${NC}"
echo -e "- Check pods: kubectl get pods -n kube-system"
echo -e "- Check logs: kubectl logs -f deployment/aws-load-balancer-controller -n kube-system"
echo -e "- Scale deployment: kubectl scale deployment aws-load-balancer-controller --replicas=5 -n kube-system"
echo -e "- Delete deployment: kubectl delete -f k8s/"