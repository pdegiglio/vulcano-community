# Vulcano Community App - Grafana Logging Dashboard Setup

## 📊 What's Been Set Up

✅ **Loki** - Log aggregation system deployed in k3s  
✅ **Promtail** - Log collector gathering logs from all pods  
✅ **Dashboard JSON** - Pre-configured Grafana dashboard for your app  

## 🔧 Manual Setup Steps

### 1. Add Loki Data Source to Grafana

1. **Go to Grafana**: https://phoenix-server.ddns.net
2. **Login** with your admin credentials
3. **Navigate to**: Configuration → Data Sources
4. **Click**: "Add data source"
5. **Select**: "Loki"
6. **Configure**:
   - **Name**: `Loki`
   - **URL**: `http://loki.monitoring.svc.cluster.local:3100`
   - **Access**: `Server (default)`
7. **Click**: "Save & Test"

### 2. Import Dashboard

1. **Navigate to**: Dashboards → Import
2. **Click**: "Upload JSON file"
3. **Select**: `/home/paolodg/dev/repos/vulcano-community/grafana-dashboard.json`
4. **Configure**:
   - **Name**: `Vulcano Community Application Dashboard`
   - **Loki data source**: Select the Loki data source you just created
5. **Click**: "Import"

## 📈 Dashboard Features

Your new dashboard includes:

### 📊 **Metrics Panels**:
- **Log Volume** - Total logs over time
- **Log Distribution** - Logs per pod
- **Error Count** - Errors in the last 5 minutes  
- **Logs per Minute** - Current log rate

### 📝 **Log Panels**:
- **All Application Logs** - Complete log stream
- **Authentication Logs** - NextAuth specific logs
- **Errors & Warnings** - Filtered error logs
- **NextAuth Events** - Authentication events summary

### 🎯 **Log Queries Available**:
- `{app="vulcano-community"}` - All app logs
- `{app="vulcano-community"} |~ "[next-auth]"` - Auth logs only
- `{app="vulcano-community"} |~ "error|Error|ERROR"` - Error logs only

## 🔍 Useful Log Searches

Once your dashboard is set up, you can search for:
- **Authentication issues**: `[next-auth][error]`
- **Database errors**: `prisma` or `DATABASE_URL`
- **API errors**: `/api/` and `error`
- **User registrations**: `register` and `created`
- **Sign-in attempts**: `signIn` or `credentials`

## 🚀 Next Steps

After setup, you'll be able to:
1. **Monitor** your Vulcano Community app in real-time
2. **Debug** authentication issues quickly
3. **Track** user activity and errors
4. **Set up alerts** for critical errors (optional)

Your logs are now being collected automatically from the k3s cluster! 📊✨