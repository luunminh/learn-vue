/* eslint-disable @typescript-eslint/no-explicit-any */
export const customColor = {
  /*   /**=========== PRIMARY =========== */
  PRIMARY_900: '#125D35',
  PRIMARY_800: '#125D35',
  PRIMARY_700: '#051C10',
  PRIMARY_600: '#072515',
  PRIMARY_500: '#0B3820',
  PRIMARY_400: '#125E35',
  PRIMARY_300: '#406C55',
  PRIMARY_200: '#98BCA9',
  PRIMARY_100: '#C4DCCF',
  PRIMARY_50: '#DBECE3',
  PRIMARY_00: '#E9ECEA',
  /*   /**=========== PRIMARY =========== */

  /*   /**=========== GRAY =========== */
  GRAY_00: '#FFFFFF',
  GRAY_50: '#F8F8F9',
  GRAY_100: '#EDEFF1',
  GRAY_200: '#DEE1E5',
  GRAY_300: '#CFD4D9',
  GRAY_400: '#B5BDC5',
  GRAY_500: '#91979E',
  GRAY_600: '#6D7176',
  GRAY_700: '#484C4F',
  GRAY_800: '#2D2F31',
  GRAY_900: '#1B1C1E',
  /*   /**======== GRAY =========== */

  SECONDARY: '#2E7214',

  ORANGE_DARK: '#B64C00',
  ORANGE_LIGHT: '#FEEACB',

  GREEN_DARK: '#044E2B',
  GREEN_LIGHT: '#DAFAD0',

  RED_LIGHT: '#FDE0D0',
  RED_DARK: '#BB1C21',

  YELLOW_LIGHT: '#FEF2CB',
  YELLOW_DARK: '#904407',

  PURPLE_LIGHT: '#EFE2FF',
  PURPLE_DARK: '#6920C9',

  LINK: '#125E35',

  SUCCESS: '#046204',
  DANGER: '#b71111',

  DANGER_BG: '#FFDFDF',

  WARNING: '#AB3E01',
  CUSTOM_WARNING_BG: '#FFE3D3',
  WARNING_BG_LIGHT: '#FFFAF8',

  ACTIVE_HOVER: '#C4DCCF',

  INFO_BG_LIGHT: '#F0F6FA',

  HIGHLIGHTED_ROW: '#f2f7fc',
}

export const getCustomTheme = (
  color: Partial<Record<string, string>>,
): Partial<Record<string, any>> => ({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f8f8f9',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: color.GRAY_700,
        },
        h1: {
          fontSize: 32,
          fontWeight: 500,
        },
        h2: {
          fontSize: 26,
          fontWeight: 500,
        },
        h3: {
          fontSize: 20,
          fontWeight: 500,
        },
        h4: {
          fontSize: 18,
          fontWeight: 500,
        },
        h5: {
          fontSize: 16,
          fontWeight: 500,
        },
        h6: {
          fontSize: 14,
          fontWeight: 500,
        },
        body1: {
          fontSize: 16,
        },
        body2: {
          fontSize: 14,
        },
        subtitle1: {
          // type: small || body3 in Figma
          fontSize: 12,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          '&:hover': {
            color: color.PRIMARY_400,
          },
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          justifyContent: 'center',
        },
      },
    },
    MuiStep: {
      styleOverrides: {
        root: {
          p: {
            fontSize: 16,
            color: color.GRAY_600,
          },
          '&.Mui-active': {
            p: {
              color: color.PRIMARY_800,
            },
          },
          '&.Mui-completed': {
            p: {
              color: color.GRAY_900,
            },
          },
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        root: {
          '&.Mui-active, &.Mui-completed': {
            span: {
              borderColor: color.PRIMARY_400,
            },
            p: {
              color: color.GRAY_900,
            },
          },
        },
        line: {
          borderTopWidth: 4,
          borderColor: color.GRAY_200,
          transition: 'all .3s ease-out',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        // completed: {
        //   backgroundColor: color.PRIMARY_400,
        // },
        label: {
          fontSize: 16,
        },
        iconContainer: {
          div: {
            borderColor: color.GRAY_600,
          },
          svg: {
            width: 24,
            height: 24,
            text: {
              fontSize: '0.8rem',
              fontWeight: 500,
              fill: color.PRIMARY_600,
            },
            circle: {
              stroke: color.PRIMARY_400,
              strokeWidth: '1px',
              r: 11,
              fill: color.GRAY_100,
            },
          },
          '&.Mui-active, &.Mui-completed': {
            svg: {
              text: {
                fill: color.PRIMARY_800,
              },
              circle: {
                stroke: color.PRIMARY_800,
                strokeWidth: '2px',
              },
            },
          },
          '&.Mui-completed': {
            div: {
              backgroundColor: customColor.PRIMARY_400,
              color: 'white',
              border: 'none',
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: `1px solid ${customColor.GRAY_100}`,
          borderRadius: '12px',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
          borderRadius: '8px !important',
          backgroundColor: customColor.GRAY_100,

          '&.Mui-expanded': {
            borderBottomLeftRadius: '0 !important',
            borderBottomRightRadius: '0 !important',
            minHeight: 48,
          },
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          border: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
        },
        body: {
          fontSize: '0.875rem',
          '&.MuiTableCell-root': {
            padding: '12px 16px',
          },
        },
        head: {
          '&.MuiTableCell-root': {
            backgroundColor: color.TABLE_HEADER_BG,
            color: color.TABLE_HEADER_TEXT,
            fontWeight: 'bold',
            padding: '12px 16px',
          },
          '&.MuiTableCell-root span button': {
            color: color.TABLE_HEADER_TEXT,
            fontWeight: 'bold',
          },
          '&.MuiTableCell-root span button div, &.MuiTableCell-root span button div span svg': {
            color: `${color.TABLE_HEADER_TEXT} !important`,
            fontWeight: 'bold',
          },
          button: {
            fontSize: '0.875rem',
          },
          div: {
            fontSize: '0.875rem',
          },
        },
        footer: {
          '&.MuiTableCell-root': {
            border: 'none',
            padding: '6px 0',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        outlinedWarning: {
          backgroundColor: customColor.WARNING_BG_LIGHT,
        },
        outlinedInfo: {
          backgroundColor: customColor.INFO_BG_LIGHT,
          padding: '0 8px',
        },
      },
    },
  },
})
