interface Auth {
   role: string;
   id?: number | string;
   accessPurpose?: string;
   purpose?: string;
   exp?: string;
}

interface Rule {
   role: string;
   action: string;
   target: string;
   condition?: (id: number | string, authId?: number | string) => boolean;
}
interface AttributesType {
   action: string;
   target: string;
   auth: Auth;
   id?: number | string;
}


export const Ability = (action: string, target: string, auth: { [key: string]: any }, id?: number | string): boolean => {
   const Param: Rule[] = [
      // administrator
      { role: 'administrator', action: 'manage', target: 'all' },

      // admin
      { role: 'admin', action: 'manage', target: 'flight' },
      { role: 'admin', action: 'manage', target: 'booking' },
      { role: 'admin', action: 'manage', target: 'user' },
      { role: 'admin', action: 'read', target: 'city' },
      { role: 'admin', action: 'read', target: 'airplane' },
      { role: 'admin', action: 'read', target: 'airport' },

      // customerSupport
      { role: 'customerSupport', action: 'manage', target: 'booking' },

      // technicalSupport
      { role: 'technicalSupport', action: 'manage', target: 'flight' },
      { role: 'technicalSupport', action: 'manage', target: 'booking' },
      { role: 'technicalSupport', action: 'read', target: 'user' },
      { role: 'technicalSupport', action: 'manage', target: 'city' },
      { role: 'technicalSupport', action: 'manage', target: 'airplane' },
      { role: 'technicalSupport', action: 'manage', target: 'airport' },

      // salesAgent
      { role: 'salesAgent', action: 'read', target: 'booking' },
   ];

   const Access = Param
      .filter(rules => rules.role === auth.role)
      .filter(rules => rules.target === 'all' || target === rules.target)
      .filter(rules => rules.action === 'manage' || action === rules.action)
      .length > 0;

   return Access;
};


