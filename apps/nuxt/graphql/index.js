import gql from 'graphql-tag';
export const ImageFragmentDoc = gql`
    fragment Image on Image {
  id
  description
  width
  height
  sizes {
    xs {
      url
      width
    }
    sm {
      url
      width
    }
    md {
      url
      width
    }
    lg {
      url
      width
    }
    xl {
      url
      width
    }
    xxl {
      url
      width
    }
    xxxl {
      url
      width
    }
    opengraph {
      url
      width
    }
  }
}
    `;
export const ButtonFragmentDoc = gql`
    fragment Button on Button {
  blockType
  label
  url
  color
  variant
  size
  openInNewTab
}
    `;
export const HeroBlockFragmentDoc = gql`
    fragment HeroBlock on HeroBlock {
  blockType
  anchorId
  title
  subtitle
  image {
    ...Image
  }
  buttons {
    ...Button
  }
}
    ${ImageFragmentDoc}
${ButtonFragmentDoc}`;
export const TextBlockFragmentDoc = gql`
    fragment TextBlock on TextBlock {
  blockType
  anchorId
  content
}
    `;
export const PageFragmentDoc = gql`
    fragment Page on Page {
  id
  title
  slug
  meta {
    description
    image {
      ...Image
    }
    title
  }
}
    ${ImageFragmentDoc}`;
export const SvgFragmentDoc = gql`
    fragment SVG on SVG {
  id
  title
  url
  width
  height
}
    `;
export const VideoThumbnailFragmentDoc = gql`
    fragment VideoThumbnail on VideoThumbnail {
  id
  url
  width
  height
  sizes {
    thumbnail {
      url
      width
    }
  }
}
    `;
export const VideoFragmentDoc = gql`
    fragment Video on Video {
  id
  url
  thumbnail {
    ...VideoThumbnail
  }
}
    ${VideoThumbnailFragmentDoc}`;
export const GetGlobalsDocument = gql`
    query GetGlobals {
  SiteSettings {
    typography {
      font
      fontSize
    }
    colors {
      background
      foreground
      primary
      primaryForeground
      secondary
      secondaryForeground
      muted
      mutedForeground
      border
      accent
      accentForeground
    }
    navbar {
      textColor
      backgroundColor
      backgroundColorScroll
      logo {
        ...SVG
      }
      links {
        label
        url
        openInNewTab
      }
      buttons {
        ...Button
      }
    }
    footer {
      links {
        label
        url
        openInNewTab
      }
    }
    meta {
      title
      description
      image {
        ...Image
      }
    }
  }
}
    ${SvgFragmentDoc}
${ButtonFragmentDoc}
${ImageFragmentDoc}`;
export const GetPageDocument = gql`
    query GetPage($slug: String!) {
  Pages(limit: 1, where: {slug: {equals: $slug}}) {
    docs {
      ...Page
      layout {
        ...HeroBlock
        ...TextBlock
      }
    }
  }
}
    ${PageFragmentDoc}
${HeroBlockFragmentDoc}
${TextBlockFragmentDoc}`;