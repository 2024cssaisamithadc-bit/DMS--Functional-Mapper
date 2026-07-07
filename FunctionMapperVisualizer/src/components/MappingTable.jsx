// ─── MappingTable Component ───────────────────────────────────────────────────
// Shows input→output mapping for all active functions

import React from "react";
import MappingRow from "./MappingRow";

function MappingTable({ mappings, inputVals, onRemove }) {
  return (
    <div className="table-area">
      <div className="table-label">Input → Output Mapping Table</div>

      {mappings.length === 0 ? (
        <div className="empty-msg">
          No functions added yet. Use the left panel to add one.
        </div>
      ) : (
        mappings.map((m, i) => (
          <MappingRow
            key={i}
            mapping={m}
            index={i}
            inputVals={inputVals}
            onRemove={onRemove}
          />
        ))
      )}
    </div>
  );
}

export default MappingTable;
