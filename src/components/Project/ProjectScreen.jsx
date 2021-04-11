import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typography, Layout, Menu, Table, Button, Tag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  createProject,
  getProjects,
  updateProject,
} from "../../api_functions";
import CreateProjectForm from "./CreateProjectForm";
import EditProjectForm from "./EditProjectForm";

const { Content, Header } = Layout;
const { Title } = Typography;

export default function ProjectScreen(props) {
  const [projectList, setProjectList] = useState([]);
  const [creationVisible, setCreationVisible] = useState(false);
  const [projectForEdit, setProjectForEdit] = useState({});

  useEffect(() => {
    getProjects().then((projects) => setProjectList(projects));
  }, []);

  const create = (formValues) => {
    createProject(formValues).then(() => {
      setCreationVisible(false);
      getProjects().then((projects) => setProjectList(projects));
    });
  };

  const onEdit = (selectedProject) => setProjectForEdit(selectedProject);
  const update = (formValues) => {
    updateProject(formValues).then(() => {
      setProjectForEdit({});
      getProjects().then((list) => setProjectList(list));
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
            Listado de Proyectos
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                marginLeft: "20px",
                marginBottom: "10px",
                float: "right",
              }}
              onClick={() => setCreationVisible(true)}
            >
              Crear Proyecto
            </Button>
          </Title>
          <Table
            rowKey="id"
            dataSource={projectList}
            columns={getColumns(onEdit)}
          />

          {creationVisible && (
            <CreateProjectForm
              hideForm={() => setCreationVisible(false)}
              onSubmit={create}
            />
          )}

          {projectForEdit.id && (
            <EditProjectForm
              project={projectForEdit}
              hideForm={() => setProjectForEdit({})}
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
    title: "Nombre Proyecto",
    dataIndex: "nombre",
    width: "30%",
  },
  {
    title: "Estado",
    dataIndex: "estado",
    render: (estado) => {
      return <Tag color="blue">{estado}</Tag>;
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
