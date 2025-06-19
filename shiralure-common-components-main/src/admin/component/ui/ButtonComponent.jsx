const ButtonComponent = ({ variant = "blueclr", onClick, children, ...rest }) => {
  return (
    <>
      <style>
        {`
          .btn {
            padding: 6px 12px;
            font-size: 14px;
            font-weight: 500;
            border-radius: 5px;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.4rem;
            cursor: pointer;
            border: none;
          }

          /* Default Blue Button */
          .btn.blueclr {
            background-color: #6366f1;
            color: white;
          }
          .btn.blueclr:hover {
            background-color: #4f46e5;
          }

          /* Dark Blue Button */
          .btn.darkblue {
            background-color: #1e3a8a;
            color: white;
          }
          .btn.darkblue:hover {
            background-color: #1e40af;
          }
                      .btn.darkblack {
            background-color:black;
            color: white;
          }
          .btn.darkblack:hover {
            background-color:rgb(9, 11, 16);
          }

          /* Text only buttons */
          .btn.text-only {
            background: none;
            color: #6366f1;
            padding: 0;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: color 0.3s ease;
          }
          .btn.text-only:hover {
            color: #4f46e5;
          }

          /* Circular small gray buttons (qty) */
          .btn.circle-gray {
            background-color: #6E7191;
            color: #fff;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            padding: 0;
            justify-content: center;
            font-size: 12px;
          }
          .btn.circle-gray:hover {
            background-color: #5a5d7a;
          }

          /* Circular semi-transparent blue (delete) */
          .btn.circle-blue-transparent {
            background-color: rgba(90, 102, 241, 0.5);
            color: #5A66F1;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            padding: 0;
            justify-content: center;
            font-size: 12px;
            margin: 5px;
          }
          .btn.circle-blue-transparent:hover {
            background-color: rgba(90, 102, 241, 0.7);
          }

          /* Rounded gray button (cancel) */
          .btn.gray-rounded {
            background-color: #6c757d;
            color: white;
            border-radius: 50px;
            padding: 10px 30px;
          }
          .btn.gray-rounded:hover {
            background-color: #5a6268;
          }

          /* Rounded green button (order) */
          .btn.green {
            background-color: #28a745;
            color: white;
            border-radius: 50px;
            padding: 10px 30px;
          }
          .btn.green:hover {
            background-color: #218838;
          }
        `}
      </style>

      <button className={`btn ${variant}`} onClick={onClick} {...rest}>
        {children}
      </button>
    </>
  );
};

export default ButtonComponent;
