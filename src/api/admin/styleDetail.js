import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/bmapi/styleDetail',   
    method: 'get',
    params: query
  });
}

// 样板详情
export function getStyleDetail(query) {
  return fetch({
    url: '/bmapi/styleDetail?ModelName='+query,   
    method: 'get',
    // params: query
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
    url: '/bmapi/styleDetailProcess?ModelId='+id ,
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

//获取xmlmode信息

export function getXmlInfo(query) {
  return fetch({
    url: '/bmapi/model/getmodelxml',   
    method: 'get',
    params: query
  });
}

//修改xmlmode信息

export function editXmlInfo(obj) {
  return fetch({
    url: '/bmapi/model/handledefinemodel',
    method: 'post',
    data: obj
  });
}

/**获取样式prj信息 */
export function getmodelprjinfo(params){
  return fetch({
    url:"/bmapi/model/getmodelprjinfo",
    method:"get",
    params
  })
}