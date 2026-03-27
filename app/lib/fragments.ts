// Reusable Storefront API fragments

export const IMAGE_FRAGMENT = `#graphql
  fragment Image on Image {
    id
    url
    altText
    width
    height
  }
`;

export const MONEY_FRAGMENT = `#graphql
  fragment Money on MoneyV2 {
    amount
    currencyCode
  }
`;

export const PRODUCT_CARD_FRAGMENT = `#graphql
  fragment ProductCard on Product {
    id
    title
    handle
    tags
    availableForSale
    priceRange {
      minVariantPrice {
        ...Money
      }
      maxVariantPrice {
        ...Money
      }
    }
    images(first: 2) {
      nodes {
        ...Image
      }
    }
    variants(first: 3) {
      nodes {
        id
        title
        availableForSale
        price {
          ...Money
        }
        compareAtPrice {
          ...Money
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`;

export const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    handle
    descriptionHtml
    description
    tags
    availableForSale
    vendor
    productType
    publishedAt
    options {
      id
      name
      values
    }
    priceRange {
      minVariantPrice {
        ...Money
      }
      maxVariantPrice {
        ...Money
      }
    }
    images(first: 10) {
      nodes {
        ...Image
      }
    }
    variants(first: 20) {
      nodes {
        id
        title
        sku
        availableForSale
        quantityAvailable
        price {
          ...Money
        }
        compareAtPrice {
          ...Money
        }
        selectedOptions {
          name
          value
        }
      }
    }
    seo {
      title
      description
    }
    metafields(identifiers: [
      {namespace: "zakitos", key: "heat_level"},
      {namespace: "zakitos", key: "flavor_notes"},
      {namespace: "zakitos", key: "shu_rating"},
      {namespace: "zakitos", key: "chili_type"},
      {namespace: "zakitos", key: "origin"}
    ]) {
      key
      namespace
      value
    }
  }
  ${IMAGE_FRAGMENT}
  ${MONEY_FRAGMENT}
`;

export const COLLECTION_FRAGMENT = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    description
    image {
      ...Image
    }
  }
  ${IMAGE_FRAGMENT}
`;
