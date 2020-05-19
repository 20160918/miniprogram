import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../service/common.service';
import {NzMessageService} from 'ng-zorro-antd';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-stu-course-admin',
  templateUrl: './stu-course-admin.component.html',
  styleUrls: ['./stu-course-admin.component.scss']
})
export class StuCourseAdminComponent implements OnInit {

  listOfData: any[] = [];
  fixHeader = true;
  // 网络图
  graph = {
    nodes: [],
    links: [],
    categories: [{target: 0}, {source: 1}]
  };
  // tslint:disable-next-line:variable-name
  detail_list: any;
  // tslint:disable-next-line:variable-name
  option_table_graph: {};

  constructor(private commonService: CommonService, private message: NzMessageService) { }

  // 导出Excel的方法
  exportAsExcelFile() {
    const json = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listOfData.length ; i++) {
      json.push({
        "学员": this.listOfData[i].source,
        "课程": this.listOfData[i].target
      });
    }
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    // const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'csv', type: 'array' });
    // 这里类型如果不正确，下载出来的可能是类似xml文件的东西或者是类似二进制的东西等
    this.saveAsExcelFile(excelBuffer, '学员-课程信息');
  }
  saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, fileName + new Date().toLocaleDateString() + '.csv');
    // 如果写成.xlsx,可能不能打开下载的文件，这可能与Excel版本有关
  }
  singletableGraph(tablename) {
    // tslint:disable-next-line:variable-name
    const table_graph = {
      nodes: [],
      links: [],
      categories: [{target: 0}, {source: 1}]
    };
    let j = 0;
    console.log( this.graph.links);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.graph.links.length; i++) {
      // tslint:disable-next-line:triple-equals
      if ((this.graph.links[i].source == tablename)) {
        j = j + 1;
        // tslint:disable-next-line:triple-equals
        if (j == 1) {
          // tslint:disable-next-line:variable-name
          const table_graph_nodes: { [key: string]: any } = {};
          table_graph_nodes.category = 0;
          table_graph_nodes.symbolSize = 38;
          table_graph_nodes.name = this.graph.links[i].source;
          table_graph_nodes.label = this.graph.links[i].source;
          table_graph.nodes.push(table_graph_nodes);
        }
        table_graph.links.push(this.graph.links[i]);
        // tslint:disable-next-line:variable-name
        const table_graph_nodes2: { [key: string]: any } = {};
        table_graph_nodes2.category = 1;
        table_graph_nodes2.symbolSize = 20;
        table_graph_nodes2.name = this.graph.links[i].target;
        table_graph_nodes2.label = this.graph.links[i].target;
        table_graph.nodes.push(table_graph_nodes2);
      }
    }
    console.log(table_graph);
    this.option_table_graph = {
      title: {
        // text: '一致性网络图',//标题
        top: 'top', // 相对在y轴上的位置
        left: 'center'// 相对在x轴上的位置
      },
      tooltip : {// 提示框，鼠标悬浮交互时的信息提示
        trigger: 'item', // 数据触发类型
        formatter(params) {// 触发之后返回的参数，这个函数是关键
          // tslint:disable-next-line:triple-equals
          if (params.data.category != undefined) {// 如果触发节点
            return '学员/课程:' + params.data.label; // 返回标签
          }
        },
      },
      // 全局颜色，图例、节点、边的颜色都是从这里取，按照之前划分的种类依序选取
      color: [ 'rgb(180, 82, 205)', 'rgb(72, 118, 255)', 'rgb(17,144,147)'],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      // sereis的数据: 用于设置图表数据之用
      series : [
        {
          name: '关联性网络图', // 系列名称
          type: 'graph', // 图表类型
          layout: 'force', // echarts3的变化，force是力向图，circular是和弦图
          draggable: true, // 指示节点是否可以拖动
          data: table_graph.nodes, // 节点数据
          links: table_graph.links, // 边、联系数据
          categories: table_graph.categories, // 节点种类
          focusNodeAdjacency: true, // 当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          label: {// 图形上的文本标签，可用于说明图形的一些数据信息
            normal: {
              show : true, // 显示
              position: 'right', // 相对于节点标签的位置
              // 回调函数，你期望节点标签上显示什么
              formatter(params) {
                return params.data.label;
              },
            }
          },
          // 节点的style
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            }
          },
          // 关系边的公用线条样式
          lineStyle: {
            normal: {
              show : true,
              color: 'source', // 决定边的颜色是与起点相同还是与终点相同
              curveness: 0.1// 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
            }
          },
          emphasis: {
            lineStyle: {
              width: 10
            }
          },
          force: {
            edgeLength: 100, // 线的长度，这个距离也会受 repulsion，支持设置成数组表达边长的范围
            repulsion: 500// 节点之间的斥力因子。值越大则斥力越大
          }
        }
      ]
    };
  }
  singletableGraph2(tablename) {
    // tslint:disable-next-line:variable-name
    const table_graph = {
      nodes: [],
      links: [],
      categories: [{target: 0}, {source: 1}]
    };
    let j = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.graph.links.length; i++) {
      // tslint:disable-next-line:triple-equals
      if ((this.graph.links[i].target == tablename)) {
        j = j + 1;
        // tslint:disable-next-line:triple-equals
        if (j == 1) {
          // tslint:disable-next-line:variable-name
          const table_graph_nodes: { [key: string]: any } = {};
          table_graph_nodes.category = 0;
          table_graph_nodes.symbolSize = 38;
          table_graph_nodes.name = this.graph.links[i].target;
          table_graph_nodes.label = this.graph.links[i].target;
          table_graph.nodes.push(table_graph_nodes);
        }
        // tslint:disable-next-line:variable-name
        const graph_links: { [key: string]: any } = {};
        graph_links.source =  this.graph.links[i].target;
        graph_links.target =  this.graph.links[i].source;
        table_graph.links.push(graph_links);
        // tslint:disable-next-line:variable-name
        const table_graph_nodes2: { [key: string]: any } = {};
        table_graph_nodes2.category = 1;
        table_graph_nodes2.symbolSize = 20;
        table_graph_nodes2.name = this.graph.links[i].source;
        table_graph_nodes2.label = this.graph.links[i].source;
        table_graph.nodes.push(table_graph_nodes2);
      }
    }
    console.log(table_graph);
    this.option_table_graph = {
      title: {
        // text: '一致性网络图',//标题
        top: 'top', // 相对在y轴上的位置
        left: 'center'// 相对在x轴上的位置
      },
      tooltip : {// 提示框，鼠标悬浮交互时的信息提示
        trigger: 'item', // 数据触发类型
        formatter(params) {// 触发之后返回的参数，这个函数是关键
          // tslint:disable-next-line:triple-equals
          if (params.data.category != undefined) {// 如果触发节点
            return '课程/学员:' + params.data.label; // 返回标签
          }
        },
      },
      // 全局颜色，图例、节点、边的颜色都是从这里取，按照之前划分的种类依序选取
      color: ['rgb(194,53,49)', 'rgb(178,144,137)', 'rgb(97,160,168)'],
      animationDuration: 1500,
      animationEasingUpdate: 'quinticInOut',
      // sereis的数据: 用于设置图表数据之用
      series : [
        {
          name: '关联性网络图', // 系列名称
          type: 'graph', // 图表类型
          layout: 'force', // echarts3的变化，force是力向图，circular是和弦图
          draggable: true, // 指示节点是否可以拖动
          data: table_graph.nodes, // 节点数据
          links: table_graph.links, // 边、联系数据
          categories: table_graph.categories, // 节点种类
          focusNodeAdjacency: true, // 当鼠标移动到节点上，突出显示节点以及节点的边和邻接节点
          roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
          label: {// 图形上的文本标签，可用于说明图形的一些数据信息
            normal: {
              show : true, // 显示
              position: 'right', // 相对于节点标签的位置
              // 回调函数，你期望节点标签上显示什么
              formatter(params) {
                return params.data.label;
              },
            }
          },
          // 节点的style
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          // 关系边的公用线条样式
          lineStyle: {
            normal: {
              show : true,
              color: 'source', // 决定边的颜色是与起点相同还是与终点相同
              curveness: 0.1// 边的曲度，支持从 0 到 1 的值，值越大曲度越大。
            }
          },
          emphasis: {
            lineStyle: {
              width: 10
            }
          },
          force: {
            edgeLength: 100, // 线的长度，这个距离也会受 repulsion，支持设置成数组表达边长的范围
            repulsion: 500// 节点之间的斥力因子。值越大则斥力越大
          }
        }
      ]
    };
  }
  ngOnInit() {
    this.graph = {
      nodes: [],
      links: [],
      categories: [{target: 0}, {source: 1}]
    };
    this.commonService.courseAdmin()
      .subscribe(
        res => {
          console.log(res);
          const dataList: any[] = [];
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < res.length; i++) {
            // tslint:disable-next-line:indent prefer-for-of
            for (let j = 0; j < res[i].Stu_course.length; j++) {
              dataList.push(res[i].Stu_course[j]);
              // tslint:disable-next-line:indent
            }
          }
          this.detail_list = dataList;
          console.log(this.detail_list);
          for (let i = 0; i < this.detail_list.length; i++) {
            // tslint:disable-next-line:variable-name
            const graph_links: { [key: string]: any } = {};
            // tslint:disable-next-line:triple-equals
            if (i == 0) {
              graph_links.source = this.detail_list[i].stu_account;
              graph_links.target = this.detail_list[i].course_id + '';
              this.graph.links.push(graph_links);
            } else {
              // tslint:disable-next-line:triple-equals
              if (this.detail_list[i].stu_account != this.detail_list[i - 1].stu_account) {
                graph_links.source = this.detail_list[i].stu_account;
                graph_links.target = this.detail_list[i].course_id + '';
                this.graph.links.push(graph_links);
              } else {
                // tslint:disable-next-line:triple-equals
                if (this.detail_list[i].course_id != this.detail_list[i - 1].course_id) {
                  graph_links.source = this.detail_list[i].stu_account;
                  graph_links.target = this.detail_list[i].course_id + '';
                  this.graph.links.push(graph_links);
                }
              }
            }
          }
          const tablelist = [];
          // tslint:disable-next-line:prefer-for-of
          for (let j = 0; j < this.detail_list.length; j++) {
            // tslint:disable-next-line:triple-equals
            if (tablelist.indexOf(this.detail_list[j].stu_account) == -1) {
              tablelist.push(this.detail_list[j].stu_account);
              // tslint:disable-next-line:variable-name
              const graph_nodes: { [key: string]: any } = {};
              graph_nodes.category = 0;
              graph_nodes.name = this.detail_list[j].stu_account;
              graph_nodes.label = this.detail_list[j].stu_account;
              this.graph.nodes.push(graph_nodes);
            }
            // tslint:disable-next-line:triple-equals
            if (tablelist.indexOf(this.detail_list[j].course_id) == -1) {
              tablelist.push(this.detail_list[j].course_id);
              // tslint:disable-next-line:variable-name
              const graph_nodes: { [key: string]: any } = {};
              graph_nodes.category = 0;
              graph_nodes.name = this.detail_list[j].course_id + '';
              graph_nodes.label = this.detail_list[j].course_id + '';
              this.graph.nodes.push(graph_nodes);
            }
          }
          console.log(this.graph);
          this.listOfData = this.graph.links;
        },
        err => console.log(err),
        () => {
          this.singletableGraph(this.graph.nodes[0].name);
        }
      );

  }




}
