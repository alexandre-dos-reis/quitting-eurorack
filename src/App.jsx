import useAxios from "axios-hooks";

const calculateAmount = (modules) => {
  return modules.map((m) => m.price).reduce((a, b) => a + b, 0);
};

function App() {
  const [{ data, loading, error }] = useAxios(
    "https://office.alexandre-dosreis.me/items/module?fields=id,manufacturer,name,on_sale,first_owner,box_included,price,condition,is_sold,modulargrid,rack-rash,pictures.*"
  );

  if (loading)
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );
  if (error)
    return (
      <div className="App">
        <h1>Error !</h1>
      </div>
    );

  const modules = data.data;
  const totalAmount = calculateAmount(
    modules.filter((m) => {
      return m.on_sale === true || m.is_sold === true;
    })
  );
  const amountSold = calculateAmount(modules.filter((m) => m.is_sold === true));

  return (
    <div className="App">
      <h1>&#128512; Hello, I'm quitting Eurorack. &#128557;</h1>
      <h2>&#128176; Total : {totalAmount} € &#128176;</h2>
      <h2>&#128176; Sold : {amountSold} € &#128176;</h2>
      <h2>Here's my selling list:</h2>
      <div className="table">
        <table>
          <thead>
            <tr>
              {/* <th>Markdown</th> */}
              <th>Manufacturer</th>
              <th>Name</th>
              <th>Price</th>
              <th>Pictures</th>
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
                  !m.is_sold &&
                  m.on_sale && (
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
                        You can view my selling list
                        [here](https://quitting-eurorack.reges.fr).
                        <br />
                        <br />
                        Best,
                        <br />
                        Alexandre
                        <br />
                        <br />
                        {m.pictures.map((p) => (
                          <p key={p.id}>
                            ![{m.name}](
                            {`https://office.alexandre-dosreis.me/assets/${p.directus_files_id}`}
                            )
                          </p>
                        ))}
                      </td> */}
                      <td>{m.manufacturer}</td>
                      <td>{m.name}</td>
                      <td style={{ textAlign: "end" }}>{m.price} €</td>
                      <td>
                        <div className="images">
                          {m.pictures.map((p, i) => (
                            <a
                              key={i}
                              href={`https://office.alexandre-dosreis.me/assets/${p.directus_files_id}`}
                              target="_blank"
                            >
                              &#128444;&#65039;
                            </a>
                          ))}
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {m.modulargrid ? (
                          m.modulargrid.startsWith("http") ? (
                            <a href={m.modulargrid} target="_blank">
                              See offer on Reverb
                            </a>
                          ) : (
                            <a
                              href={`https://www.modulargrid.net/e/offers/view/${m.modulargrid}`}
                              target="_blank"
                            >
                              See offer on MG
                            </a>
                          )
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
