export interface IZnkiItem {
  object: 'page';
  id: string;
  created_time: string;
  last_edited_time: string;
  parent: Parent;
  archived: boolean;
  properties: Properties;
}
export interface Parent {
  type: ParentType;
  database_id: string;
}

export enum ParentType {
  DatabaseID = 'database_id',
}

export interface Properties {
  Tags: Tags;
  Reviews?: Reviews;
  Status?: Status;
  id: IDClass;
  Name: Name;
}

export interface Name {
  id: TypeEnum;
  type: TypeEnum;
  title: Title[];
}

export enum TypeEnum {
  Title = 'title',
}

export interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: null;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Text {
  content: string;
  link: null;
}

export interface Reviews {
  id: string;
  type: string;
  number: number;
}

export interface Status {
  id: string;
  type: string;
  select: Select;
}

export interface Select {
  id: string;
  name: string;
  color: string;
}

export interface Tags {
  id: TagsID;
  type: TagsType;
  multi_select: Select[];
}

export enum TagsID {
  Ackd = 'Ackd',
}

export enum TagsType {
  MultiSelect = 'multi_select',
}

export interface IDClass {
  id: IDID;
  type: IDType;
  rich_text: any[];
}

export enum IDID {
  RXzT = 'rXzT',
}

export enum IDType {
  RichText = 'rich_text',
}
