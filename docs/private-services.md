# Private cloud service gateway

This document describes the access model for the private tools that make up the Remote Codex Workstation.

## Scope

The workstation may integrate with:

- VS Code
- KasmVNC
- Wetty

These are treated as controlled private services, not public Internet apps.

## Access policy

- All private services require a valid authenticated session.
- Access is evaluated server-side before the browser can open the service.
- Owner users can access owner-only services.
- Admin users can access admin-gated services.
- Services that are disabled are not returned to the client.

## Service routing model

The app exposes a protected endpoint such as:

```text
/api/services/private
```

This endpoint returns only the services that the current user is allowed to access.

## Example policy

```ts
privateProxyConfig = {
  vscode: { enabled: true, url: 'https://vscode.example.internal', allowedRoles: ['owner'] },
  kasmvnc: { enabled: true, url: 'https://kasmvnc.example.internal', allowedRoles: ['owner'] },
  wetty: { enabled: false, url: 'https://wetty.example.internal', allowedRoles: ['admin'] }
};
```

## Security rules

- No direct browser-to-service exposure
- No credentials in the browser
- Session authorization is evaluated on the backend
- Every service action should be logged
- Consent is required before any destructive media or playlist action

## Production note

In production, these internal endpoints should sit behind a reverse proxy, private network, and robust firewall policy. The front-end should never know the raw private network routes unless the session is currently valid and authorized.
