#!/usr/bin/env bash
# Quick manual tests for the webhook handler (dev server must be running: npm run dev)

BASE_URL="http://localhost:${PORT:-3000}/api/webhook"

echo "\n1) Correct token (should return 200 and challenge)"
curl -si "${BASE_URL}?hub.mode=subscribe&hub.verify_token=${WHATSAPP_VERIFY_TOKEN:-whatsappx2025}&hub.challenge=ok-challenge" || true

echo "\n2) Wrong token (should return 403 JSON)"
curl -si "${BASE_URL}?hub.mode=subscribe&hub.verify_token=WRONGTOKEN&hub.challenge=ok-challenge" || true

echo "\n3) POST sample (should return JSON { success: true } or 401/400/error depending on config)"
curl -si -X POST "${BASE_URL}" -H "Content-Type: application/json" -d '{"object":"whatsapp","entry":[]}' || true

echo "\nDone."
