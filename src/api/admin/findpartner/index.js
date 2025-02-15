import fetch from 'utils/fetch';
// StyleIquiry
export function page(query) {
  return fetch({
    url: '/bmapi/style',   
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/bmapi/partner?obj',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/bmapi/staffmanager/' + id,
    method: 'get'
  })
}

export function delObj(Id) {
  return fetch({
    url: '/bmapi/staffmanager/' + Id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return fetch({
    url: '/bmapi/staffmanager?upUser',
    method: 'put',
    data: obj
  })
}

export function downLoadObj(obj) {
  return fetch({
    url: '/bmapi/downStyle',
    method: 'get',
    params: obj
  })
}

export function importObj(obj) {
  return fetch({
    url: '/bmapi/cad1?ModelId='+obj,
    method: 'post'
  })
}

//更改存储模式
export function pageSaveModel(obj) {
  return fetch({
    url: '/bmapi/style',
    method: 'put',
    data:obj
  })
}

//更改款式信息
export function UpdateStyleInfo(obj) {
  return fetch({
    url: '/bmapi/style',
    method: 'put',
    data:obj
  })
}

// 删除款式

export function deleteStyle(id) {
  return fetch({
    url: '/bmapi/style?StyleId='+id,
    method: 'delete',
    // data:obj
  })
}

//查询样式

export function getModelInfo(query) {
  return fetch({
    url: '/bmapi/model/getstylebymodeldefine',   
    method: 'get',
    params: query
  });
}