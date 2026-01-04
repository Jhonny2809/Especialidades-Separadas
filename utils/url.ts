
/**
 * Anexa parâmetros UTM da URL atual ao link de destino de forma robusta.
 * Utiliza a API URL nativa para evitar erros de concatenação de strings.
 */
export const appendUTMs = (url: string): string => {
  if (typeof window === 'undefined' || !url || typeof url !== 'string') return url;
  
  try {
    // Criar um objeto URL para manipular os parâmetros de forma segura
    const targetUrl = new URL(url, window.location.origin);
    const currentParams = new URLSearchParams(window.location.search);
    
    // Mesclar parâmetros atuais nos parâmetros de destino (preservando os atuais se houver conflito)
    currentParams.forEach((value, key) => {
      targetUrl.searchParams.set(key, value);
    });
    
    return targetUrl.toString();
  } catch (e) {
    // Fallback caso a URL seja inválida ou um path relativo
    const search = window.location.search;
    if (!search || search === '?') return url;
    const cleanSearch = search.startsWith('?') ? search.substring(1) : search;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}${cleanSearch}`;
  }
};

/**
 * Realiza o redirecionamento seguro para o checkout preservando UTMs e disparando eventos de pixel.
 */
export const redirectToCheckout = (url: string) => {
  if (!url || typeof url !== 'string') return;
  
  const finalUrl = appendUTMs(url);
  
  // Disparar evento do Facebook Pixel se disponível
  try {
    const fbPixel = (window as any).fbq;
    if (typeof fbPixel === 'function') {
      fbPixel('track', 'InitiateCheckout', {
        content_name: 'Especialidades Premium',
        currency: 'BRL'
      });
    }
  } catch (e) {
    console.warn("Erro ao disparar evento do Facebook Pixel:", e);
  }

  // Tracking do Utmify (se configurado para escutar redirecionamentos manuais)
  // O script do Utmify geralmente injeta parâmetros automaticamente, 
  // mas o redirecionamento via window.location é a forma mais segura.
  
  window.location.href = finalUrl;
};
