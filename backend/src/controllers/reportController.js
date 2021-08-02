import fertilization from "../models/fertilizationModel";
import fumigation from "../models/fumigationModel";
import sowing from "../models/sowingModel";

export const getReportFertilizationForLot = async (req, res) => {
  let { module, lot, date1, date2 } = req.query;
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toISOString().split("T")[0];
  date1 == "undefined" ? (date1 = today) : date1;
  date2 == "undefined" ? (date2 = today) : date2;

  if (lot != "all") {
    if (module == "fertilization") {
      const dataModule = await fertilization.find({
        lot: lot,
        $and: [
          { createdAt: { $gte: new Date(`${date1}T00:00:00.000Z`) } },
          { createdAt: { $lte: new Date(`${date2}T23:59:59.999Z`) } },
        ],
      });

      if (dataModule.length == 0) {
        res.send({
          message: `No hay datos entre ${date1} y ${date2} para el lote ${lot} en el modulo de fertilizacion`,
        });
      }

      let N = 0,
        P2O2 = 0,
        K2O = 0,
        CaO = 0,
        S = 0,
        Fe = 0,
        Mn = 0,
        Cu = 0,
        Zn = 0,
        Mo = 0,
        B = 0,
        cc = 0,
        gr = 0,
        total = 0;

      let composition = {},
        amount = {};

      let names = [],
        equipment = [],
        method = [],
        product = [];

      dataModule.map((item) => {
        N += item.composition.N;
        P2O2 += item.composition.P2O2;
        K2O += item.composition.K2O;
        CaO += item.composition.CaO;
        S += item.composition.S;
        Fe += item.composition.Fe;
        Mn += item.composition.Mn;
        Cu += item.composition.Cu;
        Zn += item.composition.Zn;
        Mo += item.composition.Mo;
        B += item.composition.B;
        cc += item.amount.cc;
        gr += item.amount.gr;
        total += item.amount.total;
        names.push(item.fullName);
        equipment.push(item.equipment);
        method.push(item.method);
        product.push(item.product);
        /* console.log(item.fullName) */
      });
      const namesUniquesSet = new Set(names),
        equipmentUniquesSet = new Set(equipment),
        methodUniquesSet = new Set(method),
        productUniquesSet = new Set(product);

      let namesUniques = [...namesUniquesSet],
        equipmentUniques = [...equipmentUniquesSet],
        methodUniques = [...methodUniquesSet],
        productUniques = [...productUniquesSet];
      composition = {
        N,
        P2O2,
        K2O,
        CaO,
        S,
        Fe,
        Mn,
        Cu,
        Zn,
        Mo,
        B,
      };
      amount = {
        cc,
        gr,
        total,
      };

      const fertilizationForReport = {
        composition,
        amount,
        employees: namesUniques,
        equipmentUniques,
        methodUniques,
        productUniques,
        numberReports: dataModule.length,
        lot,
        date1,
        date2,
        section: "Fertilizacion",
      };
      res.send({ fertilizationForReport });
    } else if (module == "fumigation") {
      const dataModule = await fumigation.find({
        lot: lot,
        $and: [
          { createdAt: { $gte: new Date(`${date1}T00:00:00.000Z`) } },
          { createdAt: { $lte: new Date(`${date2}T23:59:59.999Z`) } },
        ],
      });
      if (dataModule.length == 0) {
        res.send({
          message: `No hay datos entre ${date1} y ${date2} para el lote ${lot} en el modulo de Fumigacion`,
        });
      }

      let pc = 0,
        pr = 0,
        total = 0;
      let plague = [],
        names = [],
        activeIngredient = [],
        supplies = [];

      dataModule.map((item) => {
        plague.push(item.plague);
        names.push(item.fullName);
        activeIngredient.push(item.activeIngredient);
        supplies.push(item.supplies);
        pc += Number.isInteger(item.pc) ? item.pc : parseInt(item.pc, 10);
        pr += Number.isInteger(item.pr) ? item.pr : parseInt(item.pr, 10);
        total += Number.isInteger(item.totalSpent)
          ? item.totalSpent
          : parseInt(item.totalSpent, 10);
      });

      const namesUniquesSet = new Set(names),
        plagueUniquesSet = new Set(plague),
        activeIngredientUniquesSet = new Set(activeIngredient),
        suppliesUniquesSet = new Set(supplies);

      let namesUniques = [...namesUniquesSet],
        plagueUniques = [...plagueUniquesSet],
        activeIngredientUniques = [...activeIngredientUniquesSet],
        suppliesUniques = [...suppliesUniquesSet];

      let fumigationForReport = {
        plagueLot: plagueUniques,
        namesU: namesUniques,
        activeIngredientU: activeIngredientUniques,
        suppliesU: suppliesUniques,
        pc,
        pr,
        total,
        lot,
        module: "Fumigacion",
        date1,
        date2,
      };

      res.send({ fumigationForReport });
    } else if (module == "sowing") {
      const dataModule = await sowing.find({
        lot: lot,
        $and: [
          { createdAt: { $gte: new Date(`${date1}T00:00:00.000Z`) } },
          { createdAt: { $lte: new Date(`${date2}T23:59:59.999Z`) } },
        ],
      });

      if (dataModule.length == 0) {
        res.send({
          message: `No hay datos entre ${date1} y ${date2} para el lote ${lot} en el modulo de Siembra`,
        });
      }
      let totalTrees = 0,
        agriminsGr = 0,
        agriminsKg = 0,
        agrocilceoGr = 0,
        agrocilceoKg = 0,
        organomineralGr = 0,
        organomineralKg = 0,
        calDolomitaGr = 0,
        calDolomitaKg = 0,
        micorrizasGr = 0,
        micorrizasKg = 0,
        microesentialsGr = 0,
        microesentialsKg = 0;
      let names = [],
        variety = [],
        originVegetal = [];
      dataModule.map((item) => {
        totalTrees += item.totalTrees;
        names.push(item.fullName);
        variety.push(item.variety);
        originVegetal.push(item.vegetableOrigin);
        agriminsGr += item.Agrimins.gr;
        agriminsKg += item.Agrimins.gr;
        agrocilceoGr += item.Agrocilceo.gr;
        agrocilceoKg += item.Agrocilceo.kg;
        organomineralGr += item.Organomineral.gr;
        organomineralKg += item.Organomineral.kg;
        calDolomitaGr += item.calDolomita.gr;
        calDolomitaKg += item.calDolomita.kg;
        micorrizasGr += item.micorrizas.gr;
        micorrizasKg += item.micorrizas.kg;
        microesentialsGr += item.microesentials.gr;
        microesentialsKg += item.microesentials.kg;
      });
      const namesUniquesSet = new Set(names),
        varietyUniquesSet = new Set(variety),
        originVegetalUniquesSet = new Set(originVegetal);

      let namesUniques = [...namesUniquesSet],
        varietyUniques = [...varietyUniquesSet],
        originVegetalUniques = [...originVegetalUniquesSet];

      let sowingForReports = {
        name: namesUniques,
        variety: varietyUniques,
        originVegetal: originVegetalUniques,
        agrimins: {
          gr: agriminsGr,
          kg: agriminsKg,
        },
        agrocilceo: {
          gr: agrocilceoGr,
          kg: agrocilceoKg,
        },
        organomineral: {
          gr: organomineralGr,
          kg: organomineralKg,
        },
        calDolomita: {
          gr: calDolomitaGr,
          kg: calDolomitaKg,
        },
        micorrizas: {
          gr: micorrizasGr,
          kg: micorrizasKg,
        },
        microesentials: {
          gr: microesentialsGr,
          kg: microesentialsKg,
        },
      };
      res.send({ sowingForReports });
    }
  } else {
    res.send({ message: "Opcion para generar un reporte de todos los lotes" });
  }
};
