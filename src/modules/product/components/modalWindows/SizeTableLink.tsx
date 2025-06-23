export function SizeTable() {
  return (
    <table className="w-full text-lg text-left border mt-10 border-[var(--hoverBorder)]">
      <thead>
        <tr>
          <th className="table-size__item">Розмір виробника</th>
          <th className="table-size__item">Український розмір</th>
          <th className="table-size__item">
            обхват тілії,
            {' '}
            <span className="lowercase">см</span>
          </th>
          <th className="table-size__item">
            обхват стегон,
            {' '}
            <span className="lowercase">см</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="table-size__item font-semibold">2XS</td>
          <td className="table-size__item font-light">34-36</td>
          <td className="table-size__item font-light">57-60</td>
          <td className="table-size__item font-light">82-85</td>
        </tr>
        <tr className="bg-[var(--inputField)]">
          <td className="table-size__item font-semibold">XS</td>
          <td className="table-size__item font-light">38-40</td>
          <td className="table-size__item font-light">61-66</td>
          <td className="table-size__item font-light">86-91</td>
        </tr>
        <tr>
          <td className="table-size__item font-semibold">S</td>
          <td className="table-size__item font-light">42-44</td>
          <td className="table-size__item font-light">67-72</td>
          <td className="table-size__item font-light">92-97</td>
        </tr>
        <tr className="bg-[var(--inputField)]">
          <td className="table-size__item font-semibold">M</td>
          <td className="table-size__item font-light">46-48</td>
          <td className="table-size__item font-light">73-78</td>
          <td className="table-size__item font-light">98-103</td>
        </tr>
        <tr>
          <td className="table-size__item font-semibold">l</td>
          <td className="table-size__item font-light">50-52</td>
          <td className="table-size__item font-light">79-85</td>
          <td className="table-size__item font-light">104-110</td>
        </tr>
        <tr className="bg-[var(--inputField)]">
          <td className="table-size__item font-semibold">xl</td>
          <td className="table-size__item font-light">54-56</td>
          <td className="table-size__item font-light">95-104</td>
          <td className="table-size__item font-light">118-125</td>
        </tr>
        <tr>
          <td className="table-size__item font-semibold">2 xl</td>
          <td className="table-size__item font-light">58-60</td>
          <td className="table-size__item font-light">95-104</td>
          <td className="table-size__item font-light">118-125</td>
        </tr>
        <tr className="bg-[var(--inputField)]">
          <td className="table-size__item font-semibold">3 xl</td>
          <td className="table-size__item font-light">62-64</td>
          <td className="table-size__item font-light">109-118</td>
          <td className="table-size__item font-light">131-140</td>
        </tr>
        <tr>
          <td className="table-size__item font-semibold">4 xl</td>
          <td className="table-size__item font-light">66-68</td>
          <td className="table-size__item font-light">119-128</td>
          <td className="table-size__item font-light">141-150</td>
        </tr>
      </tbody>
    </table>
  )
}
