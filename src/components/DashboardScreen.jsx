import React from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Statistic,
  Dropdown,
} from "antd";
import {
  UsergroupAddOutlined,
  ControlOutlined,
  FundProjectionScreenOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { PERMITS } from "../constants";
import { getStats } from "../api_functions";
import { useAuth, usePermitValidator } from "../auth_functions";

const { Title, Link } = Typography;

const { Content, Header } = Layout;

const {
  ROLE_MANAGER,
  USER_MANAGER,
  PROJECT_MANAGER,
  TASK_MANAGER,
  CONFIGURATION_MANAGER,
} = PERMITS;

export default function DashboardScreen(props) {
  let auth = useAuth();
  const { user } = auth;
  let history = useHistory();
  const { userName = "" } = user;
  const [stats, setStats] = React.useState({});

  React.useEffect(() => {
    getStats().then((data) => setStats(data));
  }, []);

  const adminMenu = (
    <Menu>
      <Menu.Item
        key="#users"
        onClick={() => history.push("/users")}
        hidden={!usePermitValidator([USER_MANAGER])}
      >
        Usuarios
      </Menu.Item>
      <Menu.Item
        key="#role"
        onClick={() => history.push("/roles")}
        hidden={!usePermitValidator([ROLE_MANAGER])}
      >
        Roles
      </Menu.Item>
    </Menu>
  );

  const developmentMenu = (
    <Menu>
      <Menu.Item
        key="#projects"
        onClick={() => history.push("/projects")}
        hidden={!usePermitValidator([PROJECT_MANAGER])}
      >
        Proyectos
      </Menu.Item>
      <Menu.Item
        key="#tasks"
        onClick={() => history.push("/tasks")}
        hidden={!usePermitValidator([TASK_MANAGER])}
      >
        Tareas
      </Menu.Item>
    </Menu>
  );

  const configMenu = (
    <Menu>
      <Menu.Item
        key="#base-line"
        onClick={() => history.push("/base-line")}
        hidden={!usePermitValidator([CONFIGURATION_MANAGER])}
      >
        Lineas Base
      </Menu.Item>
    </Menu>
  );

  const loading = Object.keys(stats).length === 0;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header className="header">
        <div className="logo" />
        <div style={{ float: "right" }}>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">{userName.toUpperCase()}</Menu.Item>
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
        <Title>Bienvenido al sistema SAIP</Title>
        <Row gutter={16} justify="space-around">
          {usePermitValidator([USER_MANAGER, ROLE_MANAGER]) && (
            <Col span={6}>
              <CustomCard
                title="Administración"
                desc="Crear Roles, Crear Usuarios, Asignar Roles a Usuarios"
                menu={adminMenu}
                loading={loading}
                statDataList={[
                  {
                    title: "Usuarios",
                    value: stats.Usuarios,
                    prefix: <UsergroupAddOutlined />,
                  },
                  {
                    title: "Roles",
                    value: stats.Roles,
                    prefix: <ControlOutlined />,
                  },
                ]}
              />
            </Col>
          )}

          {usePermitValidator([PROJECT_MANAGER, TASK_MANAGER]) && (
            <Col span={6}>
              <CustomCard
                title="Desarrollo"
                desc="Crear Proyecto, Crear o agregar Tareas a proyecto, Conectar Tareas"
                menu={developmentMenu}
                loading={loading}
                statDataList={[
                  {
                    title: "Proyectos",
                    value: stats.Proyectos,
                    prefix: <FundProjectionScreenOutlined />,
                  },
                  {
                    title: "Tareas",
                    value: stats.Tareas,
                    prefix: <UnorderedListOutlined />,
                  },
                ]}
              />
            </Col>
          )}

          {usePermitValidator([CONFIGURATION_MANAGER]) && (
            <Col span={6}>
              <CustomCard
                title="Gestión de la Configuración"
                desc="Crear línea base, Visualizar líneas bases en Tabla"
                menu={configMenu}
                loading={loading}
                statDataList={[
                  {
                    title: "Total Lineas Base",
                    value: "n/a",
                    prefix: <FundProjectionScreenOutlined />,
                  },
                  {
                    title: "Proyectos",
                    value: stats.Proyectos,
                    prefix: <FundProjectionScreenOutlined />,
                  },
                ]}
              />
            </Col>
          )}
        </Row>
      </Content>
    </Layout>
  );
}

const CustomCard = ({ title, desc, menu, statDataList = [], loading }) => {
  const [stat1, stat2] = statDataList;

  return (
    <Dropdown overlay={menu} trigger={["hover"]}>
      <Card
        hoverable
        cover={
          <Card loading={loading}>
            <Row>
              <Col span={12}>
                <Statistic valueStyle={{ color: "#3f8600" }} {...stat1} />
              </Col>
              <Col span={12}>
                <Statistic valueStyle={{ color: "#3f8600" }} {...stat2} />
              </Col>
            </Row>
          </Card>
        }
      >
        <Card.Meta
          title={<Link target="_blank">{title}</Link>}
          description={desc}
        />
      </Card>
    </Dropdown>
  );
};
