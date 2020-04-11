import React, { useEffect, useState } from 'react';
import styles from './home.less';
import classNames from 'classnames';
import ComponentList from '../components/ComponentList';
import DragCanvas from '../components/DragCanvas';
import ComponentConfig from '../components/ComponentConfig';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  SmileTwoTone,
  AppstoreOutlined,
  CheckCircleOutlined,
  HighlightOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Tabs, Input, Modal, Form } from 'antd';
const { TabPane } = Tabs;
const { TextArea } = Input;

const IndexView = props => {
  const { dispatch, componentView, form, match } = props;
  const { params } = match;
  const { getFieldDecorator } = form;

  const [comListHidden, setComListHidden] = useState(false);

  /**
   * @description 左边切换的事件，是否显示componentList
   */
  const toggleComponentList = () => {
    setComListHidden(!comListHidden);
  };

  const cls = classNames(styles.ComponentList, {
    [styles.hidden]: comListHidden === true,
  });

  /**
   * @description 生成预览代码
   */
  const CodePreview = () => {
    console.log('com', componentView);
    dispatch(routerRedux.push('/codePreview'));
  };

  useEffect(() => {
    // 首次执行
    console.log('mount----');
    // 发送setcurrentview
    dispatch({
      type: 'drag/getComponentCode',
      payload: {
        id: params.id,
      },
    });
  }, []);

  /**
   * @description 发送到服务器
   */
  const postToServer = () => {
    console.log('componentView', componentView);
    dispatch({
      type: 'drag/putComponentCode',
      payload: {
        id: params.id,
        code: componentView,
      },
    });
  };

  /**
   * @description 跳转代码广场
   */
  const comSquare = () => {
    dispatch(routerRedux.push('/comsquare'));
  };

  return (
    <div className={styles.container}>
      <div className={styles.LeftContainer}>
        <div className={styles.header}>
          <div className={styles.btnList}>
            <div className={styles.logo}>React-Drag</div>
            <div className={styles.operation}>
              <div className={styles.btn} style={{ color: '#1890FF' }}>
                <HighlightOutlined style={{ fontSize: '22px' }} />
                组件编辑
              </div>
              <div className={styles.btn} onClick={comSquare}>
                <AppstoreOutlined style={{ fontSize: '22px' }} />
                组件广场
              </div>
              <div className={styles.btn} onClick={postToServer}>
                <CheckCircleOutlined style={{ fontSize: '22px' }} />
                保存到服务器
              </div>
            </div>
            <div className={styles.userCenter}>
              <div className={styles.btn} onClick={CodePreview}>
                <UserOutlined style={{ fontSize: '22px' }} />
                用户中心
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.settings}>
            <span onClick={toggleComponentList}>
              <SmileTwoTone style={{ fontSize: '24px' }} />
            </span>
          </div>
          <div className={styles.editRegion}>
            <div className={cls}>
              <Tabs>
                <TabPane tab="公共组件" key="1">
                  <ComponentList />
                </TabPane>
              </Tabs>
            </div>
            <div className={styles.dragRegion}>
              <DragCanvas isPage={false} />
            </div>
          </div>
          <div className={styles.RightContainer}>
            <div className={styles.title}>属性编辑区</div>
            <ComponentConfig isPage={false} />
          </div>
        </div>
        <div className={styles.footer}>
          {' '}
          MIT Licensed | Copyright © 2019.12.31-present Daisy
        </div>
      </div>
    </div>
  );
};

export default connect(({ drag }) => ({
  componentView: drag.componentView,
}))(Form.create()(IndexView));
