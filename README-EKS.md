# JioHotstar AWS EKS Deployment Guide

This guide will help you deploy the JioHotstar application to AWS EKS (Elastic Kubernetes Service).

## Prerequisites

Before you begin, ensure you have the following installed and configured:

1. **AWS CLI** - [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
2. **kubectl** - [Installation Guide](https://kubernetes.io/docs/tasks/tools/)
3. **eksctl** - [Installation Guide](https://eksctl.io/introduction/#installation)
4. **Docker** - [Installation Guide](https://docs.docker.com/get-docker/)
5. **Helm** (optional) - [Installation Guide](https://helm.sh/docs/intro/install/)

## AWS Configuration

Configure your AWS credentials:

```bash
aws configure
```

Ensure your AWS user/role has the following permissions:
- EKS Full Access
- EC2 Full Access
- ECR Full Access
- IAM permissions for creating roles and policies
- CloudFormation permissions

## Deployment Steps

### Step 1: Create EKS Cluster

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Create the EKS cluster (takes 15-20 minutes)
./scripts/create-eks-cluster.sh
```

### Step 2: Build and Push Docker Image

```bash
# Update AWS_ACCOUNT_ID in the script if needed
# The script will auto-detect it if not specified
./scripts/build-and-push.sh
```

### Step 3: Configure Domain and SSL (Optional)

Update `k8s/ingress.yaml`:
- Replace `jiohotstar.yourdomain.com` with your domain
- Replace the certificate ARN with your SSL certificate ARN
- If you don't have a domain, you can use the ALB URL directly

### Step 4: Deploy to EKS

```bash
./scripts/deploy-to-eks.sh
```

## Architecture Overview

```
Internet → ALB → EKS Cluster → Pods (3 replicas)
                    ↓
                ECR (Docker Images)
```

### Components Deployed:

1. **Namespace**: `jiohotstar` - Isolated environment
2. **Deployment**: 3 replicas with resource limits
3. **Service**: ClusterIP service for internal communication
4. **Ingress**: ALB ingress for external access
5. **HPA**: Auto-scaling based on CPU/Memory usage

## Monitoring and Management

### Check Deployment Status
```bash
kubectl get pods -n jiohotstar
kubectl get services -n jiohotstar
kubectl get ingress -n jiohotstar
```

### View Logs
```bash
kubectl logs -f deployment/jiohotstar-app -n jiohotstar
```

### Scale Application
```bash
kubectl scale deployment jiohotstar-app --replicas=5 -n jiohotstar
```

### Update Application
```bash
# After making changes, rebuild and push
./scripts/build-and-push.sh

# Restart deployment to pull new image
kubectl rollout restart deployment/jiohotstar-app -n jiohotstar
```

## Cost Optimization

### Cluster Costs:
- **EKS Control Plane**: ~$73/month
- **Worker Nodes**: 3 x t3.medium = ~$100/month
- **Load Balancer**: ~$20/month
- **Total**: ~$193/month

### Cost Reduction Tips:
1. Use Spot Instances for worker nodes
2. Enable cluster autoscaler
3. Use smaller instance types for development
4. Schedule non-production clusters to shut down overnight

## Security Best Practices

1. **Network Security**:
   - Private subnets for worker nodes
   - Security groups with minimal required access
   - VPC endpoints for AWS services

2. **RBAC**:
   - Implement Kubernetes RBAC
   - Use IAM roles for service accounts

3. **Image Security**:
   - Scan Docker images for vulnerabilities
   - Use minimal base images
   - Keep images updated

## Troubleshooting

### Common Issues:

1. **Pods not starting**:
   ```bash
   kubectl describe pod <pod-name> -n jiohotstar
   ```

2. **Image pull errors**:
   - Check ECR permissions
   - Verify image URI in deployment.yaml

3. **Load Balancer not accessible**:
   - Check security groups
   - Verify ingress configuration
   - Check ALB controller logs

4. **High resource usage**:
   ```bash
   kubectl top pods -n jiohotstar
   kubectl top nodes
   ```

## Cleanup

To delete all resources:

```bash
# Delete application
kubectl delete -f k8s/

# Delete EKS cluster
eksctl delete cluster --name jiohotstar-cluster --region us-west-2
```

## Production Considerations

1. **High Availability**:
   - Deploy across multiple AZs
   - Use multiple replicas
   - Implement health checks

2. **Monitoring**:
   - Set up CloudWatch monitoring
   - Implement application metrics
   - Configure alerts

3. **Backup**:
   - Regular cluster backups
   - Database backups if applicable
   - Configuration backups

4. **CI/CD**:
   - Implement automated deployments
   - Use GitOps workflows
   - Automated testing

## Support

For issues and questions:
1. Check AWS EKS documentation
2. Review Kubernetes troubleshooting guides
3. Check application logs
4. Monitor AWS CloudWatch metrics

---

**Note**: This is a production-ready setup. Adjust configurations based on your specific requirements and security policies.