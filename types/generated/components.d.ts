import type { Schema, Struct } from '@strapi/strapi';

export interface WorkDetailsDataDetailsData extends Struct.ComponentSchema {
  collectionName: 'components_work_details_data_details_data';
  info: {
    description: '';
    displayName: 'detailsData';
  };
  attributes: {
    description: Schema.Attribute.Text;
    images: Schema.Attribute.Media<'images', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'work-details-data.details-data': WorkDetailsDataDetailsData;
    }
  }
}
