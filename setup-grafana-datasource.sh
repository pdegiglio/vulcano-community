#!/bin/bash

# Setup Loki data source in Grafana
GRAFANA_URL="https://phoenix-server.ddns.net"
GRAFANA_ADMIN_PASSWORD="${GRAFANA_ADMIN_PASSWORD:-admin}"

echo "Setting up Loki data source in Grafana..."

# Add Loki data source
curl -X POST \
  -H "Content-Type: application/json" \
  -u "admin:${GRAFANA_ADMIN_PASSWORD}" \
  --insecure \
  "${GRAFANA_URL}/api/datasources" \
  -d '{
    "name": "Loki",
    "type": "loki",
    "url": "http://loki.monitoring.svc.cluster.local:3100",
    "access": "proxy",
    "uid": "loki_datasource",
    "basicAuth": false,
    "isDefault": false,
    "jsonData": {
      "maxLines": 1000,
      "derivedFields": [
        {
          "datasourceUid": "prometheus_datasource",
          "matcherRegex": "traceID=(\\w+)",
          "name": "TraceID",
          "url": "$${__value.raw}"
        }
      ]
    }
  }'

echo -e "\n\nData source setup complete!"
echo "Dashboard file location: /home/paolodg/dev/repos/vulcano-community/grafana-dashboard.json"
echo "Import this dashboard in Grafana at: ${GRAFANA_URL}/dashboard/import"