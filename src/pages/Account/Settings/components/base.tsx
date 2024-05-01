import { UploadOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Upload } from 'antd';
import React from 'react';
import useStyles from './index.style';
import { useModel } from '@@/exports';

const BaseView: React.FC = () => {
  const { styles } = useStyles();
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  // 头像组件 方便以后独立，增加裁剪之类的功能
  const AvatarView = ({ avatar }: { avatar: string }) => (
    <>
      <div className={styles.avatar_title}>头像</div>
      <div className={styles.avatar}>
        <img src={avatar} alt="avatar" />
      </div>
      <Upload showUploadList={false}>
        <div className={styles.button_view}>
          <Button>
            <UploadOutlined />
            更换头像
          </Button>
        </div>
      </Upload>
    </>
  );

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.userAvatar) {
        return currentUser.userAvatar;
      }
      return 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
    }
    return '';
  };

  const handleFinish = async () => {
    message.success('更新基本信息成功');
  };
  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={handleFinish}
              submitter={{
                searchConfig: {
                  submitText: '更新基本信息',
                },
                render: (_, dom) => dom[1],
              }}
              initialValues={{
                ...currentUser,
              }}
            >
              <ProFormText name="userName" label="昵称" placeholder="昵称" />
              <ProFormText name="userEmail" label="邮箱" placeholder="邮箱" />
              <ProFormText name="userPhone" label="电话" placeholder="电话" />
              <ProFormTextArea name="userProfile" label="个人简介" placeholder="个人简介" />
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      }
    </div>
  );
};
export default BaseView;
