import { v4 } from 'uuid';
import { pickBy, identity } from 'lodash';

export const uuidV4 = (): string => v4();

export const filterObject = (o: {
  [key: string]: any;
}): { [key: string]: any } => pickBy(o, identity);

export const toTree = (
  data: { pid: number; [key: string]: any }[],
): { [key: string]: any } => {
  // 删除 所有 children,以防止多次调用
  data.forEach(function(item) {
    delete item.children;
  });

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  const map = {};
  data.forEach(function(item) {
    map[item.id] = item;
  });
  //        console.log(map);
  const val: any[] = [];
  data.forEach(function(item) {
    // 以当前遍历项，的pid,去map对象中找到索引的id
    const parent = map[item.pid];
    // 好绕啊，如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
      val.push(item);
    }
  });
  return val;
};
