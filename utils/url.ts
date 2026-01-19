
/**
 * Captura todos os parâmetros da URL atual (UTMs, etc.) e os mescla na URL de destino.
 * Esta versão utiliza a API URLSearchParams para garantir que os caracteres sejam
 * codificados corretamente e que nenhum parâmetro seja perdido.
 */
export const appendUTMs = (url: string): string => {
  if (typeof window === 'undefined' || !url) return url;
  
  const currentSearch = window.location.search;
  // Se não houver parâmetros na URL atual, retorna a URL original
  if (!currentSearch || currentSearch === '?') return url;

  try {
    // Tratamento para URLs absolutas
    const urlObj = new URL(url);
    const currentParams = new URLSearchParams(currentSearch);
    
    // Mescla os parâmetros: parâmetros da página atual têm prioridade ou são adicionados
    currentParams.forEach((value, key) => {
      urlObj.searchParams.set(key, value);
    });
    
    return urlObj.toString();
  } catch (e) {
    // Fallback para URLs relativas ou strings de URL complexas
    const [baseUrl, anchor] = url.split('#');
    const [path, existingSearch] = baseUrl.split('?');
    
    const targetParams = new URLSearchParams(existingSearch || '');
    const currentParams = new URLSearchParams(currentSearch);
    
    currentParams.forEach((value, key) => {
      targetParams.set(key, value);
    });
    
    const finalSearch = targetParams.toString();
    const finalAnchor = anchor ? `#${anchor}` : '';
    
    return `${path}${finalSearch ? '?' + finalSearch : ''}${finalAnchor}`;
  }
};

/**
 * Realiza o redirecionamento para o checkout garantindo a passagem de UTMs
 * e disparando eventos de rastreamento para o Facebook Pixel (se configurado).
 */
export const redirectToCheckout = (url: string) => {
  if (!url) return;
  
  const finalUrl = appendUTMs(url);
  
  // Feedback visual no console para facilitar auditoria de tráfego
  console.log(`[UTM-TRACKING] Redirecionando com parâmetros: ${finalUrl}`);
  
  // Disparo de evento de InitiateCheckout para o Pixel
  try {
    if ((window as any).fbq) {
      (window as any).fbq('track', 'InitiateCheckout');
    }
  } catch (err) {
    console.warn("Falha ao registrar evento no Pixel:", err);
  }

  // Redirecionamento de navegador
  window.location.href = finalUrl;
};
