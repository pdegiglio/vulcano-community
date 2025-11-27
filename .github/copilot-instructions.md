# Copilot Instructions for Vulcano Community Project

## General Development Principles

### Always Verify, Never Assume
- **Check versions first**: Always verify versions of libraries, frameworks, databases, and system components before making changes
- **Validate configurations**: Check existing system configurations (k3s, databases, nginx/traefik routing) before making modifications
- **Best solutions first**: Always aim for the optimal solution rather than quick workarounds
- **Ask for feedback**: Before implementing workarounds or alternative approaches, ask for user feedback and approval

### System Architecture Overview

**Infrastructure Stack:**
- **Container Runtime**: Docker 27.4.0
- **Orchestration**: k3s (Kubernetes distribution)
- **Ingress Controller**: Traefik (configured in k8s/ingress.yaml)
- **TLS/SSL**: cert-manager with Let's Encrypt (letsencrypt-prod cluster issuer)
- **Current Domain**: vulcano-community.ddns.net

**Application Stack:**
- **Framework**: Next.js 16.0.4 (React 19.2.0)
- **Database**: Prisma ORM (v6.19.0) 
- **Authentication**: NextAuth.js 4.24.13
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript 5

### Development Workflow

#### Testing New Functionality
1. **Create temporary dev routes**: When testing new features, create additional prefixes to the domain (e.g., `dev.vulcano-community.ddns.net` or `test-feature.vulcano-community.ddns.net`)
2. **Use dev server first**: Test on development server before packaging into Docker images
3. **Fast iteration**: Prioritize quick feedback loops before k3s deployment
4. **Staging approach**: 
   - Local dev server (`npm run dev`)
   - Temporary route testing
   - Docker containerization
   - k3s deployment

#### Configuration Management
- **Kubernetes configs**: Located in `k8s/` directory
  - `deployment.yaml`: Application deployment configuration
  - `ingress.yaml`: Traefik ingress rules and TLS settings
  - `secret.yaml`: Kubernetes secrets management
  - `loki-stack.yaml`: Logging infrastructure
- **Environment variables**: Check `.env` files and k8s secrets before deployment
- **Build process**: Use `build-and-deploy.sh` for production deployments

### Best Practices

#### Before Making Changes
1. Check current package versions (`package.json`)
2. Verify database schema (Prisma migrations)
3. Review existing k8s configurations
4. Test routing and ingress rules
5. Validate environment-specific settings

#### Development Testing
1. Start with `npm run dev` for rapid prototyping
2. Create test routes with prefixed domains for staging
3. Verify Docker build works locally
4. Test k8s deployment in isolated namespace if needed
5. Monitor logs through Grafana/Loki stack

#### Security Considerations
- Always use TLS/SSL (configured via cert-manager)
- Validate authentication flows with NextAuth
- Check secret management in k8s
- Review ingress annotations for security headers

### Common Commands Reference
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run linting

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma studio

# Docker
docker build -t vulcano-community .
docker run -p 3000:3000 vulcano-community

# Kubernetes (when kubectl available)
kubectl apply -f k8s/
kubectl get pods -n default
kubectl logs -f deployment/vulcano-community
```

### Troubleshooting Checklist
1. **Dependency conflicts**: Check package-lock.json for version mismatches
2. **Database issues**: Verify Prisma schema and migrations
3. **Routing problems**: Check traefik ingress configuration and DNS
4. **Build failures**: Review Dockerfile and build dependencies
5. **k3s deployment**: Validate YAML syntax and resource limits

---

## K3s Deployment Best Practices

### General K3s Configuration Knowledge:
- **Cluster Status**: K3s runs as systemd service (`systemctl status k3s`)
- **kubectl Access**: Use `sudo k3s kubectl` for cluster operations
- **Image Storage**: Local Docker images are available to k3s automatically
- **Port Conflicts**: k3s doesn't handle port conflicts gracefully during rollouts
- **Node Resources**: Single-node cluster - resource constraints can cause scheduling issues

### Efficient Redeployment Process:
1. **Pre-deployment Cleanup**: Always remove old pods manually before rollout
2. **Image Building**: Docker builds are cached efficiently with multi-stage builds
3. **Rollout Strategy**: Use `rollout restart` after manual pod cleanup
4. **Validation**: Check HTTP response and pod logs to confirm deployment success

### Troubleshooting Common Issues:
- **Port Conflicts**: `FailedScheduling` due to port conflicts - delete old pods first
- **Image Caching**: k3s caches images locally - MUST use versioned tags or force update
- **kubectl Connection**: If kubectl fails, ensure k3s service is running
- **Resource Limits**: Monitor memory/CPU usage on single-node clusters

### CRITICAL: Docker Image Versioning for k3s
**Problem**: k3s caches Docker images locally. Using `latest` tag means k3s won't pull new versions.

**Solution**: Always use timestamp-based or commit-based image tags:
```bash
# Build with timestamp tag
docker build -t vulcano-community:$(date +%s) .
# OR build with git commit hash
docker build -t vulcano-community:$(git rev-parse --short HEAD) .
```

**Deployment Requirements**:
1. **Never reuse image tags** - each build must have unique tag
2. **Update deployment manifest** to reference new image tag
3. **Force image pull policy** with `imagePullPolicy: Always` (if using registry)
4. **Clean old images** periodically to save disk space

## Vulcano Community Specific Deployment Process

### Pod Management for Efficient Redeployment:
**Critical**: The vulcano-community deployment has issues with graceful pod termination and port conflicts.

**Required Pre-deployment Steps**:
1. **Identify Running Pods**: `sudo k3s kubectl get pods | grep vulcano`
2. **Force Delete Old Pods**: `sudo k3s kubectl delete pod <old-pod-name> --force --grace-period=0`
3. **Wait for Port Release**: Allow 10-15 seconds for port cleanup
4. **Deploy New Version**: Use `rollout restart` or apply manifests

**Why This Is Necessary**:
- Pods don't terminate gracefully during rollouts
- Port conflicts occur when old pods hold onto host ports
- k3s scheduler fails with "didn't have free ports" error
- Manual cleanup ensures clean deployment state
- **k3s caches Docker images** - new builds with same tag won't be used
- **Image versioning required** - each deployment needs unique image tag

### Environment-Specific Configuration:
- **Production URL**: `https://vulcano-community.ddns.net`
- **Local Dev URL**: `http://192.168.1.16:8080` (with --hostname 0.0.0.0)
- **Database**: PostgreSQL on localhost:5432
- **Environment Files**: `.env` (production) + `.env.local` (development overrides)

*Last updated: 2025-11-27*
*System: Docker 27.4.0, Next.js 16.0.4, React 19.2.0, Prisma 6.19.0*