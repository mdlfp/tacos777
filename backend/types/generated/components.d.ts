import type { Schema, Struct } from '@strapi/strapi';

export interface BussinesOpeningHours extends Struct.ComponentSchema {
  collectionName: 'components_bussines_opening_hours';
  info: {
    displayName: 'opening-hours';
    icon: 'clock';
  };
  attributes: {
    closes: Schema.Attribute.Time;
    dayOfWeek: Schema.Attribute.Enumeration<
      [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]
    >;
    opens: Schema.Attribute.Time;
  };
}

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Link';
    icon: 'apps';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface ComponentSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_component_social_links';
  info: {
    displayName: 'social-link';
    icon: 'link';
  };
  attributes: {
    plataforma: Schema.Attribute.Enumeration<
      ['facebook', 'instagram', 'tiktok']
    >;
    url: Schema.Attribute.Component<'component.link', false>;
  };
}

export interface ComponentTimelineItem extends Struct.ComponentSchema {
  collectionName: 'components_component_timeline_items';
  info: {
    displayName: 'timeline-item';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    year: Schema.Attribute.Integer & Schema.Attribute.Required;
  };
}

export interface LayoutContactoSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_contacto_sections';
  info: {
    displayName: 'Contacto Section';
    icon: 'message';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'house';
  };
  attributes: {
    ctaLink: Schema.Attribute.Component<'component.link', true>;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    subHeading: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LayoutMenuSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_menu_sections';
  info: {
    displayName: 'Menu Section';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.String;
    products: Schema.Attribute.Relation<'oneToOne', 'api::product.product'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutNosotrosSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_nosotros_sections';
  info: {
    displayName: 'Nosotros Section';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    timeline: Schema.Attribute.Component<'component.timeline-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Nosotros'>;
  };
}

export interface LayoutSucursakesSection extends Struct.ComponentSchema {
  collectionName: 'components_layout_sucursakes_sections';
  info: {
    displayName: 'Sucursales Section';
    icon: 'chartBubble';
  };
  attributes: {
    description: Schema.Attribute.String;
    sucursal: Schema.Attribute.Relation<'oneToOne', 'api::sucursal.sucursal'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Sucursales'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'eye';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images'>;
    metaRobots: Schema.Attribute.String;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'bussines.opening-hours': BussinesOpeningHours;
      'component.link': ComponentLink;
      'component.social-link': ComponentSocialLink;
      'component.timeline-item': ComponentTimelineItem;
      'layout.contacto-section': LayoutContactoSection;
      'layout.hero-section': LayoutHeroSection;
      'layout.menu-section': LayoutMenuSection;
      'layout.nosotros-section': LayoutNosotrosSection;
      'layout.sucursakes-section': LayoutSucursakesSection;
      'shared.seo': SharedSeo;
    }
  }
}
