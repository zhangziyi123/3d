/**
 * @author: zhangziyi-k@glondon.com
 * @description:
 * @Date: 2019/5/15 10:50
 */
// 天地图URL配置
let TDTURL_CONFIG = {
  // 在线天地图影像服务地址(墨卡托投影)
  TDT_IMG_W: `http://{s}.tianditu.gov.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图矢量地图服务(墨卡托投影)
  TDT_VEC_W: `http://{s}.tianditu.gov.cn/vec_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图影像中文标记服务(墨卡托投影)
  TDT_CIA_W: `http://{s}.tianditu.gov.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图矢量中文标记服务(墨卡托投影)
  TDT_CVA_W: `http://{s}.tianditu.gov.cn/cva_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图影像服务地址(经纬度)
  TDT_IMG_C: `http://{s}.tianditu.gov.cn/img_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图矢量地图服务(经纬度)
  TDT_VEC_C: `http://{s}.tianditu.gov.cn/vec_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=vec&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图影像中文标记服务(经纬度)
  TDT_CIA_C: `http://{s}.tianditu.gov.cn/cia_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ebef01c272359809b59d1ef1641d3dd`,
  // 在线天地图矢量中文标记服务(经纬度)
  TDT_CVA_C: `http://{s}.tianditu.gov.cn/cva_c/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cva&tileMatrixSet=c&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=1ebef01c272359809b59d1ef1641d3dd`
}
export default TDTURL_CONFIG
