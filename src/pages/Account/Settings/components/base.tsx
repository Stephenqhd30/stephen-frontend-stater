import { UploadOutlined } from '@ant-design/icons';
import { ProForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button, message, Upload } from 'antd';
import React from 'react';
import useStyles from './index.style';
import { useModel } from '@@/exports';
import { updateUserUsingPost } from '@/services/stephen-backend/userController';

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

  const handleUpdate = async (values: API.UserUpdateRequest) => {
    const hide = message.loading('正在更新');
    console.log(values)
    try {
      await updateUserUsingPost({
        ...values,
        id: currentUser?.id
      });
      hide();
      message.success('更新成功');
      return true;
    } catch (error: any) {
      hide();
      message.error(`更新失败${error.message}, 请重试!`);
      return false;
    }
  };

  return (
    <div className={styles.baseView}>
      {
        <>
          <div className={styles.left}>
            <ProForm
              layout="vertical"
              onFinish={async (values) => {
                await handleUpdate(values);
              }}
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
              <ProFormText width="md" name="userName" label="昵称" placeholder="昵称" />
              <ProFormText width="md" name="userEmail" label="邮箱" placeholder="邮箱" />
              <ProFormText width="md" name="userPhone" label="电话" placeholder="电话" />
              <ProFormTextArea
                width="md"
                name="userProfile"
                label="个人简介"
                placeholder="个人简介"
              />
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
