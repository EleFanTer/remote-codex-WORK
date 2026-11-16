export const privateProxyConfig = {
  vscode: {
    enabled: true,
    url: 'https://vscode.example.internal',
    allowedRoles: ['owner']
  },
  kasmvnc: {
    enabled: true,
    url: 'https://kasmvnc.example.internal',
    allowedRoles: ['owner']
  },
  wetty: {
    enabled: false,
    url: 'https://wetty.example.internal',
    allowedRoles: ['admin']
  }
} as const;

export type PrivateServiceKey = keyof typeof privateProxyConfig;

export function getAllowedPrivateServices(session?: { role?: string } | null) {
  if (!session) {
    return [] as Array<{ name: string; url: string; access: 'owner-only' | 'admin' }>;
  }

  return Object.entries(privateProxyConfig)
    .filter(([, config]) => config.enabled)
    .filter(([_, config]) => config.allowedRoles.includes(session.role ?? '') || session.role === 'owner')
    .map(([name, config]) => ({
      name,
      url: config.url,
      access: config.allowedRoles.includes('owner') ? 'owner-only' : 'admin'
    }));
}

export function canAccessPrivateService(serviceName: string, session?: { role?: string } | null) {
  const config = privateProxyConfig[serviceName as PrivateServiceKey];
  if (!config || !config.enabled) {
    return false;
  }

  return config.allowedRoles.includes(session?.role ?? '') || session?.role === 'owner';
}
