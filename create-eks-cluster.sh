#!/bin/bash

# Create EKS cluster for JioHotstar without eksctl
set -e

# Configuration
CLUSTER_NAME="jiohotstar-cluster"
AWS_REGION="us-east-1"
NODE_GROUP_NAME="jiohotstar-nodes"
KUBERNETES_VERSION="1.28"
NODE_ROLE_ARN="arn:aws:iam::243826067468:role/EKSNodeRole"   # Replace with your IAM role for nodes
CLUSTER_ROLE_ARN="arn:aws:iam::243826067468:role/EKSClusterRole"  # Replace with IAM role for cluster
SUBNET_IDS="subnet-00df92e982777984d subnet-0855f92ac8673662a"  # Replace with your subnet IDs
SG_ID="sg-0bfd6458a8eb3026e"                    # Replace with your security group

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}Creating EKS cluster for JioHotstar...${NC}"

# 1. Create the EKS cluster
#aws eks create-cluster \
 # --name $CLUSTER_NAME \
  #--region $AWS_REGION \
  #--kubernetes-version $KUBERNETES_VERSION \
  #--role-arn $CLUSTER_ROLE_ARN \
  #--resources-vpc-config subnetIds=$SUBNET_IDS,securityGroupIds=$SG_ID

# 2. Wait for cluster to become ACTIVE
echo -e "${YELLOW}Waiting for EKS cluster to become ACTIVE...${NC}"
#aws eks wait cluster-active --name $CLUSTER_NAME --region $AWS_REGION

# 3. Create node group
#aws eks create-nodegroup \
 # --cluster-name $CLUSTER_NAME \
 # --nodegroup-name $NODE_GROUP_NAME \
  #--node-role $NODE_ROLE_ARN \
  #--subnets $SUBNET_IDS \
  #--scaling-config minSize=2,maxSize=6,desiredSize=3 \
  #--disk-size 20 \
  #--instance-types t3.medium \
  #--ami-type AL2_x86_64 \
  #--region $AWS_REGION

# 4. Wait for node group to be active
echo -e "${YELLOW}Waiting for node group to become ACTIVE...${NC}"
#aws eks wait nodegroup-active --cluster-name $CLUSTER_NAME --nodegroup-name $NODE_GROUP_NAME --region $AWS_REGION

# 5. Update kubeconfig
aws eks update-kubeconfig --name $CLUSTER_NAME --region $AWS_REGION

# 6. Verify cluster
echo -e "${YELLOW}Verifying cluster creation...${NC}"
kubectl get nodes

# 7. Install metrics server for HPA
echo -e "${YELLOW}Installing metrics server...${NC}"
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

# 8. Create storage class
echo -e "${YELLOW}Creating storage class...${NC}"
cat <<EOF | kubectl apply -f -
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: gp2-encrypted
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp2
  encrypted: "true"
allowVolumeExpansion: true
volumeBindingMode: WaitForFirstConsumer
EOF

echo -e "${GREEN}EKS cluster created successfully without eksctl!${NC}"
echo -e "${YELLOW}Cluster Information:${NC}"
echo -e "- Cluster Name: $CLUSTER_NAME"
echo -e "- Region: $AWS_REGION"
echo -e "- Kubernetes Version: $KUBERNETES_VERSION"
echo -e "- Node Group: $NODE_GROUP_NAME"
