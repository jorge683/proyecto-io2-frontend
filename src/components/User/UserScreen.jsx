import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu, Table, Button, Tag } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import UserCreationForm from "./UserCreationForm";
import { createUser, getUsers, updateUser } from "../../api_functions";
import UserEditForm from "./UserEditForm";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function UserScreen(props) {
  const [userList, setUserList] = useState([]);
  const [creationVisible, setCreationVisible] = useState(false);
  const [userForEdit, setUserForEdit] = useState({});

  useEffect(() => {
    getUsers().then((users) => setUserList(users));
  }, []);

  const create = (formValues) => {
    createUser(formValues).then(() => {
      setCreationVisible(false);
      getUsers().then((users) => setUserList(users));
    });
  };

  const onEdit = (selectedUser) => setUserForEdit(selectedUser);
  const update = (formValues) => {
    updateUser(formValues).then(() => {
      setUserForEdit({});
      getUsers().then((users) => setUserList(users));
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <div style={{ float: "right" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">Usuario</Menu.Item>
          </Menu>
        </div>
      </Header>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div style={{ width: "80%", margin: "auto" }}>
          <Link to="/">Volver al Dashboard</Link>
          <Title level={5} style={{ textAlign: "center" }}>
            Listado de Usuarios
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                float: "right",
              }}
              onClick={() => setCreationVisible(true)}
            >
              Crear Usuario
            </Button>
          </Title>
          <Table
            rowKey="userId"
            dataSource={userList}
            columns={getColumns(onEdit)}
          />

          {creationVisible && (
            <UserCreationForm
              hideForm={() => setCreationVisible(false)}
              onSubmit={create}
            />
          )}

          {userForEdit.userId && (
            <UserEditForm
              currentUser={userForEdit}
              hideForm={() => setUserForEdit({})}
              onSubmit={update}
            />
          )}
        </div>
      </Content>
    </Layout>
  );
}

const getColumns = (onEdit) => [
  {
    title: "Nombre de Usuario",
    dataIndex: "userName",
    width: "30%",
  },
  {
    title: "Roles",
    dataIndex: "roles",
    render: (roles) => {
      return (
        <div>
          {roles.map(({ role, id }) => (
            <Tag color="blue" key={id}>
              {role}
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: "Acciones",
    key: "actions",
    render: (text, record) => (
      <Button onClick={() => onEdit(record)} type="link">
        Editar
      </Button>
    ),
  },
];
