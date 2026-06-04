'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FaArrowRight,
  FaBolt,
  FaGear,
  FaDesktop,
  FaWeightHanging,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import {
  productCategories,
  getProductsByCategory,
  type ProductCategoryId,
  type ProductItem,
} from '@/lib/products-data'
import { scrollToContactWithProduct } from '@/lib/contact-form-utils'
import { LazyImage } from '@/components/lazy-image'

function getProductIcon(product: ProductItem): IconType {
  if (product.categoryId === 'crane-sli') {
    return product.id === 'charkhi' ? FaWeightHanging : FaBolt
  }
  if (product.categoryId === 'card-services') return FaGear
  return FaDesktop
}

function getCategoryBadge(product: ProductItem): string {
  if (product.categoryId === 'crane-sli') return 'Crane SLI'
  if (product.categoryId === 'card-services') return 'Card Service'
  return 'Website'
}

export function ProductsShowcase() {
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>('all')
  const products = getProductsByCategory(activeCategory)

  return (
    <section id="products" className="section-padding">
      <div className="container-site">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">
            Our Solutions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6 text-balance">
            Crane SLI, Card Services &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Web & App Solutions
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-4xl mx-auto text-pretty">
          Delivering next-generation SLI automation (SLI-200 to SLI-600), expert industrial 
  card manufacturing, and bespoke web & app solutions tailored for business growth.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {productCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No projects in this category yet. Add website projects in portfolio to show them
            here.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const Icon = getProductIcon(product)
              const badge = getCategoryBadge(product)

              return (
                <motion.div
                  key={product.id}
                  className="flex flex-col gap-6 p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="w-full h-52 sm:h-64 rounded-xl overflow-hidden relative group">
                    <LazyImage
                      src={product.image}
                      alt={product.name}
                      width={640}
                      wrapperClassName="h-full w-full group-hover:scale-[1.05] transition-transform duration-500"
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold">
                      {badge}
                    </span>
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">{product.name}</h3>
                    </div>

                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {product.highlights.map((feature) => (
                        <span
                          key={feature}
                          className="px-4 py-2 text-sm font-medium bg-secondary/50 text-muted-foreground rounded-lg border border-border"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <motion.button
                      type="button"
                      onClick={() => scrollToContactWithProduct(product.formLabel)}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors mt-auto"
                      whileHover={{ x: 5 }}
                    >
                      Get a Quote
                      <FaArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}

        <motion.div
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <FaBolt className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Need a Custom SLI or Card Solution?</h3>
                <p className="text-muted-foreground">
                  Tell us your Crane capacity, lenght & angle Seneor, load cell type,  or board model  we respond within 24
                  hours.
                </p>
              </div>
            </div>
            <motion.button
              type="button"
              onClick={() => scrollToContactWithProduct('Crane SLI / Card Services — General Inquiry')}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors glow-primary shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Our Engineers
              <FaArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
