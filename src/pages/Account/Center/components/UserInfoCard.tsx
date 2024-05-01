import { ProDescriptions } from '@ant-design/pro-components';
import '@umijs/max';
import { Avatar, Card, Space } from 'antd';
import React from 'react';
import { useModel } from '@@/exports';
import { ClusterOutlined, ContactsOutlined, HomeOutlined } from '@ant-design/icons';
import useStyles from '@/pages/Account/Center/center.style';

/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const UserBaseInfo: React.FC<API.User> = () => {
  const { styles } = useStyles();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const initStyle = {
    minHeight: 500,
    minWidth: 380,
    marginBottom: 24,
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  }
  //  渲染用户信息
  const renderUserInfo = ({ userRole, userName, userProfile }: Partial<API.User>) => {
    return (
      <div className={styles.detail}>
        <p>
          <ContactsOutlined
            style={{
              marginRight: 8,
            }}
          />
          {userName}
        </p>
        <p>
          <ClusterOutlined
            style={{
              marginRight: 8,
            }}
          />
          {userRole}
        </p>
        <p>
          <HomeOutlined
            style={{
              marginRight: 8,
            }}
          />
          {userProfile}
        </p>
      </div>
    );
  };

  return (
    <Space size={'middle'}>
      <Card
        bordered={false}
        style={initStyle}
      >
        {currentUser && (
          <div>
            <div className={styles.avatarHolder}>
              <Avatar alt="" size={100} src={currentUser.userAvatar} />
              <div className={styles.name}>{currentUser.userName}</div>
              <div>{currentUser?.userProfile}</div>
            </div>
            {renderUserInfo(currentUser)}
          </div>
        )}
      </Card>
      <Card
        style={initStyle}
      >
        <ProDescriptions<API.User>
          title={
            <>
              <Avatar src={currentUser?.userAvatar} alt={currentUser?.userName} size={'large'} />
              <span>{currentUser?.userName}</span>
            </>
          }
          dataSource={currentUser}
          emptyText={'数据暂时不存在哦'}
          columns={[
            {
              title: '用户id',
              key: 'id',
              dataIndex: 'id',
            },
            {
              title: '用户角色',
              key: 'userRole',
              dataIndex: 'userRole',
              valueType: 'text',
              valueEnum: {
                admin: {
                  text: '管理员',
                },
                user: {
                  text: '普通用户',
                },
              },
            },
            {
              title: '用户名',
              key: 'userName',
              dataIndex: 'userName',
              valueType: 'text',
            },
            {
              title: '用户简介',
              key: 'userProfile',
              dataIndex: 'userProfile',
              valueType: 'text',
            },
            {
              title: '邮箱',
              key: 'userEmail',
              dataIndex: 'userEmail',
              valueType: 'text',
            },
            {
              title: '电话',
              key: 'userPhone',
              dataIndex: 'userPhone',
              valueType: 'text',
            },
            {
              title: '创建时间',
              key: 'createTime',
              dataIndex: 'createTime',
              valueType: 'date',
              fieldProps: {
                format: 'YYYY.MM.DD',
              },
            },
            {
              title: '更新时间',
              key: 'updateTime',
              dataIndex: 'updateTime',
              valueType: 'date',
              fieldProps: {
                format: 'YYYY.MM.DD',
              },
            },
          ]}
        />
      </Card>
    </Space>
  );
};
export default UserBaseInfo;
