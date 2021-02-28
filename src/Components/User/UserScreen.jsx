import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu, Table, Button, Tooltip, Tag } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import UserCreationForm from "./UserCreationForm";
import { getUsers } from "../../api_functions";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function UserScreen(props) {
  const [creationVisible, setCreationVisible] = useState(false);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      console.log(users);
      setUserList(users);
    });
  }, []);

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
          <Link to="/dashboard">Volver al Dashboard</Link>
          <Title level={5} style={{ textAlign: "center" }}>
            Listado de Usuarios
            <Tooltip title="Crear nuevo usuario">
              <Button
                type="primary"
                icon={<UserAddOutlined />}
                style={{ marginLeft: "20px" }}
                onClick={() => setCreationVisible(true)}
              />
            </Tooltip>
          </Title>
          <Table rowKey="userId" dataSource={userList} columns={columns} />

          {creationVisible && (
            <UserCreationForm hideForm={() => setCreationVisible(false)} />
          )}
        </div>
      </Content>
    </Layout>
  );
}

const columns = [
  {
    title: "Nombre de Usuario",
    dataIndex: "userName",
    width: "30%",
  },
  {
    title: "Roles",
    dataIndex: "roles",
    render: (roles) => {
      console.log(roles);
      return (
        <div>
          {roles.map(({ role }) => (
            <Tag color="blue">{role}</Tag>
          ))}
        </div>
      );
    },
  },
];
