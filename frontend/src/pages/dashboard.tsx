import Header from "@/components/header";
import { IUser, IContact } from "../interface/index";
import { GetServerSideProps } from "next";
import nookies from "nookies";

import api from "@/services/api";

interface IDashboardProps extends IUser {
  contacts: IContact[];
}

const Dashboard = ({ name, contacts }: IDashboardProps) => {
  return (
    <>
      <Header name={name} isLogged />
      <div className="dashboard-container">
        {contacts.map((contact) => (
          <div className="contact" key={contact.id}>
            Name: {contact.name} - Phone Number: {contact.phoneNumber}
          </div>
        ))}
      </div>
      <style jsx>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 20px;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .contact {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  const id = cookies["id"];

  if (!cookies["token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userContacts = await api.get(`/user/${id}`);
  const contacts = userContacts.data;

  return {
    props: { name: cookies["user"], contacts },
  };
};

export default Dashboard;
