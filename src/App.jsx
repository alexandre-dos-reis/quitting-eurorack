import useAxios from "axios-hooks";

function App() {
  const [{ data, loading, error }, refetch] = useAxios(
    "https://office.alexandre-dosreis.me/items/module?fields=id,manufacturer,name,first_owner,box_included,price,condition,is_sold,modulargrid,rack-rash,pictures.directus_files_id"
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  const modules = data.data;

  return (
    <div className="App">
      <h1>&#128512; Hello, I'm quitting Eurorack. &#128557;</h1>
      <h2>Here's my selling list:</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Name</th>
              <th>Price</th>
              {/* <th>Pictures</th> */}
              <th>Wanna buy ?</th>
            </tr>
          </thead>
          <tbody>
            {modules
              .sort((a, b) => {
                if (a.manufacturer > b.manufacturer) return 1;
                if (a.manufacturer < b.manufacturer) return -1;
                return 0;
              })
              .map(
                (m) =>
                  !m.is_sold && (
                    <tr key={m.id}>
                      {/* <td>
                        Hello, I'm quitting Eurorack. I'm selling my{" "}
                        {m.manufacturer} {m.name} module. <br />
                        <br />I am {!m.first_owner && "not"} the first owner.
                        <br />
                        The condition is {m.condition} with{" "}
                        {!m.rack_rash && "no"} rack rash.
                        <br />
                        Original box {!m.box_included && "not"} included.
                        <br />
                        Price is {m.price} €. Shipping and assurance not
                        included. Paypal or bank transfer accepted.
                        <br />
                        I'm located in Caen / France, so you can pick up the
                        module there.
                        <br />
                        <br />
                        You can view my selling list [here](https://quitting-eurorack.reges.fr).
                        <br />
                        <br />
                        Best,
                        <br />
                        Alexandre
                        <br />
                        <br />
                        {m.pictures.map((p) => (
                          <p>
                            ![{m.name}](
                            {`https://office.alexandre-dosreis.me/assets/${p.directus_files_id}`}
                            )
                          </p>
                        ))}
                      </td> */}
                      <td>{m.manufacturer}</td>
                      <td>{m.name}</td>
                      <td style={{ textAlign: "end" }}>{m.price} €</td>
                      {/* <td>
                        <div className="images">
                          {m.pictures.map((p) => (
                            <img
                              src={`https://office.alexandre-dosreis.me/assets/${p.directus_files_id}`}
                              alt={m.name}
                            />
                          ))}
                        </div>
                      </td> */}
                      <td style={{ textAlign: "center" }}>
                        {m.modulargrid ? (
                          <a
                            href={`https://www.modulargrid.net/e/offers/view/${m.modulargrid}`}
                          >
                            See offer on MG
                          </a>
                        ) : (
                          <a
                            href={`mailto:ajm.dosreis.daponte@gmail.com?subject=${m.manufacturer} - ${m.name}`}
                          >
                            Email me
                          </a>
                        )}
                      </td>
                    </tr>
                  )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
