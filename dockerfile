# ==============================
# Stage 1 — Build frontend
# ==============================
FROM node:18-alpine AS frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
RUN npm run build


# ==============================
# Stage 2 — Build backend
# ==============================
FROM node:18-alpine AS backend-builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

# Copy built frontend from previous stage into backend's public directory
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist


# ==============================
# Stage 3 — Final lightweight image
# ==============================
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=backend-builder /app /app

EXPOSE 3000

USER node

CMD ["node", "server.js"]
