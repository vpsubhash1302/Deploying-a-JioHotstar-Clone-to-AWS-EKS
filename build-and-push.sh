#!/bin/bash

# Build and push Docker image to ECR
set -e

# Configuration
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID="243826067468"
ECR_REPOSITORY="jiohotstar"
IMAGE_TAG="latest"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Building and pushing JioHotstar to AWS ECR...${NC}"

# Get AWS account ID if not provided
if [ "$AWS_ACCOUNT_ID" = "YOUR_ACCOUNT_ID" ]; then
    AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    echo -e "${GREEN}Detected AWS Account ID: $AWS_ACCOUNT_ID${NC}"
fi

# ECR repository URI
ECR_URI="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY"

# Create ECR repository if it doesn't exist
echo -e "${YELLOW}Creating ECR repository if it doesn't exist...${NC}"
aws ecr describe-repositories --repository-names $ECR_REPOSITORY --region $AWS_REGION >/dev/null 2>&1 || \
aws ecr create-repository --repository-name $ECR_REPOSITORY --region $AWS_REGION


# Get login token and login to ECR
echo -e "${YELLOW}Logging in to ECR...${NC}"
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_URI

# Build Docker image
echo -e "${YELLOW}Building Docker image...${NC}"
docker build -t $ECR_REPOSITORY:$IMAGE_TAG .

# Tag image for ECR
echo -e "${YELLOW}Tagging image for ECR...${NC}"
docker tag $ECR_REPOSITORY:$IMAGE_TAG $ECR_URI:$IMAGE_TAG

# Push image to ECR
echo -e "${YELLOW}Pushing image to ECR...${NC}"
docker push $ECR_URI:$IMAGE_TAG

echo -e "${GREEN}Successfully pushed image: $ECR_URI:$IMAGE_TAG${NC}"

# Update deployment with new image
echo -e "${YELLOW}Updating Kubernetes deployment...${NC}"
sed -i.bak "s|image: jiohotstar:latest|image: $ECR_URI:$IMAGE_TAG|g" k8s/deployment.yaml

echo -e "${GREEN}Build and push completed successfully!${NC}"
echo -e "${YELLOW}Next steps:${NC}"
echo -e "1. Update k8s/ingress.yaml with your domain and certificate ARN"
echo -e "2. Run: kubectl apply -f k8s/"
echo -e "3. Check deployment: kubectl get pods -n jiohotstar"