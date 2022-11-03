declare module 'treeverse';

function depth(tree:{visit:{},leave:{},filter:()=>boolean,seen:Map<any,any>,getChildren:{},tree:{}})