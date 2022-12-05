import styled from 'styled-components';
import { TCmsRole } from '../pages/team-access-control-management/teamAccessControlTypes';
import { ECmsRoleIdentifier } from '../types/eventTypes';
import { TAnalyticsSupplementalLink } from './constants/analytics-supplemental-links';
import { TChartDetails } from './constants/charts';

export const getCommaSeparatedNumberArray = (input: string): number[] => {
  let values: number[] = [];
  try {
    values = (input)
      .split(',')
      .map(s => s.trim())
      .map(n => parseInt(n))
      .filter(n => !isNaN(n));
    return values;
  } catch (e) {
    console.error('invalid input for', input);
    return values;
  }
};

export const getStringFromNumberArray =(input: number[]): string => {
  let value = '';
  if (!input) return value;
  try {
    return input.join(', ');
  } catch(e) {
    console.error('getStringFromNumberArray error\n', e);
    return value;
  }
};

export const filterUniques = (value: any, index: number, self: any) => {
  return self.indexOf(value) === index;
}

type TParsedVariable = {
  operator: string;
  value: number;
};

export type TJsonLogicResult = {
  found: boolean;
  varInfo: TParsedVariable;
};

export const isValidJSONObject = (jsonString: string): boolean => {
  try {
    var o = JSON.parse(jsonString);

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object", 
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (o && typeof o === "object") {
      return o;
    }
  }
  catch (e) { }

  return false;
};

export const findVarFromJsonLogic = (input: any, variableName: string): TJsonLogicResult => {
  let found = false;
  const operators = ['<', '>', '<=', '>=', '==', '===', '!=', '!=='];
  const varInfo: TParsedVariable = {
    operator: '-NA-',
    value: -1
  };
  let findVariable = (o: any[], op: string) => {
    if (found) return;
    if (typeof o[0] === 'number' && typeof o[1] === 'object' && 'var' in o[1] && Array.isArray(o[1].var) && o[1].var.includes(variableName)) {
      varInfo.value = o[0];
      varInfo.operator = op;
      found = true;
      // console.info('parsed dsi 1', dsi);
      return;
    } else if (typeof o[1] === 'number' && typeof o[0] === 'object' && 'var' in o[0] && Array.isArray(o[0].var) && o[0].var.includes(variableName)) {
      varInfo.value = o[1];
      varInfo.operator = op;
      found = true;
      // console.info('parsed dsi 2', dsi);
      return;
    }
  };
  let walkArray = (o: any[], key: string) => {
    // console.info('walkArray', o, key);
    if (found) return;
    if (operators.includes(key) && Array.isArray(o)) {
      // console.info('test this', key, o);
      findVariable(o, key);
    }
    if (Array.isArray(o)) {
      o.forEach((ak, ai) => {
        if (typeof o[ai] === 'string' || typeof o[ai] === 'number') {
          // console.info(key, o[ai]);
          return;
        }
        if (Array.isArray(o[ai])) {
          o[ai].forEach((e: any) => walkObject(e, key + ai));
          return;
        }
        if (typeof o[ai] === 'object') {
          walkObject(o[ai], key);
          return;
        }
      });
    }
  };
  let walkObject = (o: any, key?: string) => {
    // console.info('walkObject', o, key, o[key]);
    if (found) return;
    if (key && operators.includes(key) && Array.isArray(o)) {
      // console.info('test this', key, o);
      findVariable(o, key);
    }
    if (typeof o === 'string' || typeof o === 'number') {
      // console.info(key, o);
      return;
    }
    if (key && Array.isArray(o)) {
      // o.forEach(e => walkArray(o, key));
      walkArray(o, key);
      return;
    }
    if (typeof o === 'object') {
      for (var k in o) {
        walkObject(o[k], k);
      }
    }
  };
  walkObject(input);
  return { found, varInfo };
};



// todo: use this for react-datetime to select appropriate character
// from input when user types
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createSelection(field: any, start: number, end: number) {
  if( field.createTextRange ) {
    var selRange = field.createTextRange();
    selRange.collapse(true);
    selRange.moveStart('character', start);
    selRange.moveEnd('character', end);
    selRange.select();
    field.focus();
  } else if( field.setSelectionRange ) {
    field.focus();
    field.setSelectionRange(start, end);
  } else if( typeof field.selectionStart != 'undefined' ) {
    field.selectionStart = start;
    field.selectionEnd = end;
    field.focus();
  }
}

export const GenericPage = styled.div`
  // .MuiTypography-h3 {
  //   margin-top: 1rem;
  // }
  .MuiFormControlLabel-root {
    display: block;
  }
  .MuiFormControl-root {
    display: block;
    margin-bottom: 2rem;
  }
  .MuiInput-formControl {
    width: 100%;
  }
  .indent {
    padding: 8px 8px 8px 16px;
    margin-bottom: 8px;
    background-color: rgb(25 118 210 / 7%);
    border-radius: 4px;
  }
  .indent-outlined {
    padding: 8px 8px 8px 16px;
    border-radius: 4px;
    border: solid 1px rgb(25 118 210 / 30%);
  }
`;

export const HeightConstrainedSection = styled.div`
  @media (min-width: 1200px) {
    margin-top: 12px;
    height: calc(100vh - 250px);
    overflow: scroll;
    position: sticky;
    top: 400px;
  }
`;

export const jrUtils = {
  /** @description Provides support for `includedAppIds` and `excludedAppIds` which allow
   * charts to be shown/hidden for current selected app.
   * `includedAppIds` takes precedence over `excludedAppIds`.
   * Either one of these fields should be used ideally.
   * @param charts unfiltered charts
   * @param selectedAppBiId Blitz App ID for current selected app e.g. `'21'`
   * @returns array of filtered charts */
  getChartsFilteredByInclusionOrExclusion: (charts: TChartDetails[], selectedAppBiId: string): TChartDetails[] => {
    return charts
      .filter(c => {
        if (c.includedAppIds) {
          return c.includedAppIds.includes(selectedAppBiId);
        } else if (c.excludedAppIds) {
          return !c.excludedAppIds.includes(selectedAppBiId);
        }
        return true;
      });
  },

  /** @description Provides support for `includedAppIds` and `excludedAppIds` which allow
   * links to be shown/hidden for current selected app.
   * `includedAppIds` takes precedence over `excludedAppIds`.
   * Either one of these fields should be used ideally.
   * @param links unfiltered links
   * @param selectedAppBiId Blitz App ID for current selected app e.g. `'21'`
   * @returns array of filtered charts */
  getLinksFilteredByInclusionOrExclusion: (links: TAnalyticsSupplementalLink[], selectedAppBiId: string): TAnalyticsSupplementalLink[] => {
    return links
      .filter(c => {
        if (c.includedAppIds) {
          return c.includedAppIds.includes(selectedAppBiId);
        } else if (c.excludedAppIds) {
          return !c.excludedAppIds.includes(selectedAppBiId);
        }
        return true;
      });
  },

  downloadJson: async (obj: any, fileName = 'file') => {
    const json = JSON.stringify(obj);
    const blob = new Blob([ json ], { type:'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const date = new Date();
    link.href = href;
    link.download = `${fileName} ${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};
