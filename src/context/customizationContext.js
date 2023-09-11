import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

export const CustomizationContext = createContext();

const initialState = {
  stagingA: {},
  stagingB: {},
};

function customizationReducer(state, action) {
  switch (action.type) {
    case "INIT_LABEL": {
      const stagingA = { ...state.stagingA };
      const stagingB = { ...state.stagingB };

      if (!(action.label in stagingA)) {
        stagingA[action.label] = {};
      }

      return {
        ...state,
        stagingA: stagingA,
        stagingB: stagingB,
      };
    }
    case "SET_INCREMENT_VALUE":
      return {
        ...state,
        stagingA: {
          ...state.stagingA,
          [action.payload.label]: {
            ...state.stagingA[action.payload.label],
            [`${action.payload.title}-${action.payload.text}`]:
              action.payload.value,
          },
        },
      };
    case "SET_DROPDOWN_VALUE":
      return {
        ...state,
        stagingA: {
          ...state.stagingA,
          [action.label]: {
            ...state.stagingA[action.label],
            [action.key]: action.value,
          },
        },
      };
    case "MOVE_TO_STAGING_B": {
      const stagingA = { ...state.stagingA };
      const stagingB = { ...state.stagingB };

      Object.entries(stagingA).forEach(([label, data]) => {
        stagingB[label] = {
          ...stagingB[label],
          ...data,
        };
      });

      Object.keys(stagingB).forEach((label) => {
        Object.keys(stagingB[label]).forEach((key) => {
          if (stagingB[label][key] === "none" || stagingB[label][key] === 0) {
            delete stagingB[label][key];
          }
        });
      });

      Object.keys(stagingA).forEach((label) => {
        Object.keys(stagingA[label]).forEach((key) => {
          if (stagingA[label][key] === "none_selected") {
            delete stagingB[label][key];
          }
        });
      });

      return {
        ...state,
        stagingA: {},
        stagingB: stagingB,
      };
    }

    case "RESET_TO_DEFAULT": {
      const newStagingB = { ...state.stagingB };
      delete newStagingB[action.label];

      const defaultValues = Object.keys(
        state.stagingB[action.label] || {}
      ).reduce(
        (acc, key) => ({
          ...acc,
          [key]:
            typeof state.stagingB[action.label][key] === "number" ? 0 : "none",
        }),
        {}
      );

      return {
        ...state,
        stagingA: {
          ...state.stagingA,
          [action.label]: defaultValues,
        },
        stagingB: newStagingB,
      };
    }

    case "RESET_STAGING":
      return {
        ...state,
        stagingA: {},
      };
    case "RESET":
      return initialState;
    default:
      throw new Error(`Unsupported action type: ${action.type}`);

    case "SET_STAGING_B_DATA":
      return {
        ...state,
        stagingB: action.data,
      };
  }
}

export function CustomizationProvider({ children }) {
  const [state, dispatch] = useReducer(customizationReducer, initialState);
  const value = { state, dispatch };
  return (
    <CustomizationContext.Provider value={value}>
      {children}
    </CustomizationContext.Provider>
  );
}

export function useCustomization() {
  const context = useContext(CustomizationContext);
  if (!context) {
    throw new Error(
      "useCustomization must be used within a CustomizationProvider"
    );
  }
  return context;
}

CustomizationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
