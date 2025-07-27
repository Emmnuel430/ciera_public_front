export function CheckboxGroup({ selected, setSelected, details, setDetails }) {
  const options = [
    {
      label: "Pneus",
      name: "pneus",
      iconClass: "fas fa-car-crash", // ou "fa-tire"
    },
    {
      label: "Amortisseurs",
      name: "amortisseurs",
      iconClass: "fas fa-compress-alt", // plus clair que arrows
    },
    {
      label: "Vidange",
      name: "vidange",
      iconClass: "fas fa-oil-can",
      input: "KM depuis dern. vidange",
    },
    {
      label: "Distribution",
      name: "distribution",
      iconClass: "fas fa-sliders-h", // évoque un système mécanique
    },
    {
      label: "Révision",
      name: "revision",
      iconClass: "fas fa-list-check",
      input: "KM depuis dern. révision",
    },
    {
      label: "Climatisation",
      name: "climatisation",
      iconClass: "fas fa-snowflake",
    },
    {
      label: "Freinage",
      name: "freinage",
      iconClass: "fas fa-ban", // évoque l'arrêt
    },
    {
      label: "Échappement",
      name: "echappement",
      iconClass: "fas fa-smoking", // style évacuation/gaz
    },
    {
      label: "Autres",
      name: "autres",
      iconClass: "fas fa-ellipsis-h",
      input: "Précisez l’intervention souhaitée",
    },
  ];

  const toggle = (name) => {
    if (selected.includes(name)) {
      setSelected((prev) => prev.filter((n) => n !== name));
      setDetails((prev) => {
        const newDetails = { ...prev };
        delete newDetails[name];
        return newDetails;
      });
    } else {
      setSelected((prev) => [...prev, name]);
    }
  };

  const handleInputChange = (name, value) => {
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {options.map((opt) => (
        <div key={opt.name} className="flex flex-col items-center w-35">
          <button
            type="button"
            onClick={() => toggle(opt.name)}
            className={`w-25 h-25 rounded-full flex items-center justify-center text-4xl border-2 transition
            ${
              selected.includes(opt.name)
                ? "bg-green-600 text-white border-green-600"
                : "border-gray-300 text-white hover:border-green-500 hover:text-green-500"
            }
          `}
          >
            <i className={opt.iconClass}></i>
          </button>
          <span className="mt-2 text-10 text-center uppercase font-semibold">
            {opt.label}
          </span>

          {selected.includes(opt.name) && opt.input && (
            <input
              type="text"
              placeholder={opt.input}
              value={details[opt.name] || ""}
              onChange={(e) => handleInputChange(opt.name, e.target.value)}
              className="mt-2 w-full border p-2 rounded text-sm"
            />
          )}
        </div>
      ))}
    </div>
  );
}
