
/**
 * Captura todos os parâmetros da URL atual (UTMs, etc.) e os mescla na URL de destino.
 * Esta versão é mais robusta e trata corretamente URLs absolutas e mesclagem de parâmetros existentes.
 */
export const appendUTMs = (url: string): string => {
  if (typeof window === 'undefined' || !url) return url;
  
  const currentSearch = window.location.search;
  if (!currentSearch || currentSearch === '?') return url;

  try {
    // Tenta tratar como URL absoluta para usar a API nativa
    const urlObj = new URL(url);
    const currentParams = new URLSearchParams(currentSearch);
    
    // Mesclar: Parâmetros da página atual sobrescrevem ou adicionam aos do checkout
    currentParams.forEach((value, key) => {
      urlObj.searchParams.set(key, value);
    });
    
    return urlObj.toString();
  } catch (e) {
    // Fallback robusto para strings de URL que podem falhar no construtor (ex: paths relativos)
    const baseUrl = url.split('#')[0];
    const anchor = url.includes('#') ? '#' + url.split('#')[1] : '';
    const [path, existingSearch] = baseUrl.split('?');
    
    const targetParams = new URLSearchParams(existingSearch || '');
    const currentParams = new URLSearchParams(currentSearch);
    
    currentParams.forEach((value, key) => {
      targetParams.set(key, value);
    });
    
    const finalSearch = targetParams.toString();
    return `${path}${finalSearch ? '?' + finalSearch : ''}${anchor}`;
  }
};

/**
 * Realiza o redirecionamento seguro para o checkout preservando UTMs e disparando eventos de pixel.
 */
export const redirectToCheckout = (url: string) => {
  if (!url || typeof url !== 'string') return;
  
  const finalUrl = appendUTMs(url);
  
  // Log para depuração (útil para verificar no console se as UTMs estão indo)
  console.log(`[Redirect] Direcionando para: ${finalUrl}`);
  
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
    console.warn("Erro ao disparar evento de rastreio:", e);
  }

  // Redirecionamento direto
  window.location.href = finalUrl;
};
