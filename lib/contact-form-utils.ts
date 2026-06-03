export const CONTACT_PRODUCT_KEY = 'silicon_contact_product'

export function setContactProduct(product: string) {
  if (typeof window === 'undefined') return
  sessionStorage.setItem(CONTACT_PRODUCT_KEY, product)
}

export function getContactProduct(): string | null {
  if (typeof window === 'undefined') return null
  return sessionStorage.getItem(CONTACT_PRODUCT_KEY)
}

export function clearContactProduct() {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(CONTACT_PRODUCT_KEY)
}

export function mapProductToServiceValue(product: string): string {
  const p = product.toLowerCase()
  if (p.includes('sli') || p.includes('charkhi') || p.includes('crane')) return 'sli'
  if (p.includes('web')) return 'web'
  if (p.includes('design') || p.includes('manufactur') || p.includes('pcb')) return 'pcb'
  if (p.includes('card') || p.includes('repair')) return 'repair'
  return ''
}

export function scrollToContactWithProduct(product: string) {
  setContactProduct(product)
  const target = document.getElementById('contact')
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.dispatchEvent(new CustomEvent('silicon:contact-product', { detail: product }))
    return
  }
  window.location.href = `/?product=${encodeURIComponent(product)}#contact`
}
