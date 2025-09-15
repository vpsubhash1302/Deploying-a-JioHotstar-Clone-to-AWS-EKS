# Domain Setup Guide for JioHotstar EKS Deployment

## Option 1: No Custom Domain (Recommended for Testing)

**What to do:** Use the default `ingress.yaml` file as-is.

**Result:** Your app will be accessible via the AWS Load Balancer URL:
```
http://k8s-jiohotst-jiohotst-xxxxxxxxxx-yyyyyyyyyy.us-west-2.elb.amazonaws.com
```

**Pros:**
- No domain purchase required
- No SSL certificate setup needed
- Works immediately after deployment

**Cons:**
- Long, hard-to-remember URL
- No HTTPS (HTTP only)

---

## Option 2: Custom Domain with SSL (Production Setup)

### Step 1: Purchase/Setup Domain
- Buy a domain from Route 53, GoDaddy, Namecheap, etc.
- Example: `jiohotstar.yourdomain.com`

### Step 2: Create SSL Certificate in AWS Certificate Manager (ACM)
```bash
# Go to AWS Console > Certificate Manager
# Click "Request a certificate"
# Choose "Request a public certificate"
# Add domain name: jiohotstar.yourdomain.com
# Choose DNS validation
# Complete the validation process
```

### Step 3: Update DNS Records
Point your domain to the ALB:
```bash
# After deployment, get the ALB URL
kubectl get ingress jiohotstar-ingress -n jiohotstar

# Create a CNAME record in your DNS provider:
# Name: jiohotstar
# Type: CNAME
# Value: k8s-jiohotst-jiohotst-xxxxxxxxxx-yyyyyyyyyy.us-west-2.elb.amazonaws.com
```

### Step 4: Use the Custom Domain Ingress
```bash
# Copy the certificate ARN from ACM
# Update k8s/ingress-with-domain.yaml with:
# - Your domain name
# - Your certificate ARN
# - Your AWS account ID

# Deploy with custom domain
kubectl apply -f k8s/ingress-with-domain.yaml
```

---

## Option 3: Subdomain Setup (Recommended)

If you already own a domain like `yourdomain.com`, create a subdomain:

**Examples:**
- `jiohotstar.yourdomain.com`
- `streaming.yourdomain.com`
- `app.yourdomain.com`

**Steps:**
1. Create SSL certificate for the subdomain in ACM
2. Update `ingress-with-domain.yaml` with your subdomain
3. Create CNAME record pointing subdomain to ALB

---

## Quick Commands

### Get ALB URL after deployment:
```bash
kubectl get ingress jiohotstar-ingress -n jiohotstar -o jsonpath='{.status.loadBalancer.ingress[0].hostname}'
```

### Check certificate status:
```bash
aws acm list-certificates --region us-west-2
```

### Update ingress with domain:
```bash
# Edit the file with your domain and certificate ARN
kubectl apply -f k8s/ingress-with-domain.yaml
```

---

## Recommendations

**For Testing/Demo:** Use Option 1 (no custom domain)
**For Production:** Use Option 2 or 3 (custom domain with SSL)

**Cost Considerations:**
- Domain: $10-15/year
- SSL Certificate: Free with ACM
- Route 53 Hosted Zone: $0.50/month (if using Route 53)

---

## Troubleshooting

**Domain not working?**
- Check DNS propagation (can take up to 48 hours)
- Verify CNAME record points to correct ALB URL
- Ensure certificate is validated and issued

**SSL issues?**
- Verify certificate ARN is correct
- Check certificate covers your exact domain
- Ensure certificate is in the same region as your EKS cluster