import React, { useEffect, useState } from "react";
import { Typography, Layout, Menu, Table, Tag, Button } from "antd";
import { Link } from "react-router-dom";
import { createRole, getRoles, updateRole } from "../../api_functions";
import RoleCreationForm from "./RoleCreationForm";
import RoleEditForm from "./RoleEditForm";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function RoleScreen(props) {
  const [roleList, setRoleList] = useState([]);
  const [showCreation, setShowCreation] = useState(false);
  const [roleForEdit, setRoleForEdit] = useState({});

  useEffect(() => {
    getRoles().then((roles) => {
      setRoleList(roles);
    });
  }, []);

  const create = (formValues) => {
    createRole(formValues).then(() => {
      setShowCreation(false);
      getRoles().then((roles) => {
        setRoleList(roles);
      });
    });
  };

  const onEdit = (currentRole) => setRoleForEdit(currentRole);
  const update = (formValues) => {
    updateRole(formValues).then(() => {
      setRoleForEdit({});
      getRoles().then((roles) => {
        setRoleList(roles);
      });
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
          <Link to="/dashboard">Volver al Dashboard</Link>
          <Title level={5} style={{ textAlign: "center" }}>
            Listado de Roles
          </Title>
          <Button onClick={() => setShowCreation(true)}> Crear Rol</Button>
          <Table
            rowKey="id"
            dataSource={roleList}
            columns={getColumns(onEdit)}
          />
        </div>
        {showCreation && (
          <RoleCreationForm
            hideForm={() => setShowCreation(false)}
            onSubmit={create}
          />
        )}

        {roleForEdit.id && (
          <RoleEditForm
            currentRole={roleForEdit}
            hideForm={() => setRoleForEdit({})}
            onSubmit={update}
          />
        )}
      </Content>
    </Layout>
  );
}

const getColumns = (onEdit) => [
  {
    title: "Nombre de Rol",
    dataIndex: "role",
    width: "30%",
  },
  {
    title: "Permisos",
    dataIndex: "permits",
    render: (permits) => {
      return (
        <div>
          {permits.map(({ permit }) => (
            <Tag color="blue" key={permit.id}>
              {permit.displayName}
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
