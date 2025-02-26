import pool from '@/config/mySql';
import { Request, Response } from 'express';
import { RowDataPacket } from 'mysql2';

export const countRowData = async (req: Request, res: Response) => {
  let connection;
  try {
    connection = await pool.getConnection();

    const [air] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(ca.amount) AS total_rows FROM air_conditioning_air_device as cas JOIN air_conditioning as ca ON cas.id = ca.device_id;`,
    );
    const [cooling] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(ca.amount) AS total_rows FROM air_conditioning_cooling_device as cas JOIN air_conditioning as ca ON cas.id = ca.device_id;`,
    );
    const [heating] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(ca.amount) AS total_rows FROM air_conditioning_heating_device as cas JOIN air_conditioning as ca ON cas.id = ca.device_id;`,
    );
    const [ceiling] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM building_finishes_ceiling;`,
    );
    const [ceramic] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM building_finishes_ceramic;`,
    );
    const [door] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM building_finishes_door;`,
    );
    const [mebel] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM building_finishes_mebel;`,
    );
    const [wallpaper] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM building_finishes_wallpaper;`,
    );
    const [window] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM building_finishes_window;`,
    );
    const [conveyance] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM conveyance;`,
    );
    const [battery] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM electrical_battery;`,
    );
    const [cubicle] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_cubicle;`,
    );
    const [genset] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_genset;`,
    );
    const [lvmdp] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_lvmdp;`,
    );
    const [panel] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_panel;`,
    );
    const [rectifier] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_rectifier;`,
    );
    const [trafo] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_trafo;`,
    );
    const [ups] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM electrical_ups;`,
    );
    const [extinguish] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM extinguish;`,
    );
    const [fluid_tank] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM fluid_tank;`,
    );
    const [furniture] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM furniture;`,
    );
    const [lighting] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM lighting;`,
    );
    const [computer] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_computer;`,
    );
    const [firewalls] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_firewalls;`,
    );
    const [patch_panels] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_patch_panels;`,
    );
    const [rack_server] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_rack_server;`,
    );
    const [routers] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_routers;`,
    );
    const [storage] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_storage;`,
    );
    const [switches] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM network_switches;`,
    );
    const [pump] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM pump;`,
    );
    const [safety] = await connection.query<RowDataPacket[]>(
      `SELECT SUM(amount) AS total_rows FROM safety;`,
    );
    const [alarm] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM security_alarm;`,
    );
    const [button] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM security_button;`,
    );
    const [cctv] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM security_cctv;`,
    );
    const [detector] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM security_detector;`,
    );
    const [sound] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM security_sound;`,
    );
    const [video_recording] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total_rows FROM security_video_recording;`,
    );

    res.status(200).json({
      air: air[0].total_rows,
      cooling: cooling[0].total_rows,
      heating: heating[0].total_rows,
      ceiling: ceiling[0].total_rows,
      ceramic: ceramic[0].total_rows,
      door: door[0].total_rows,
      mebel: mebel[0].total_rows,
      wallpaper: wallpaper[0].total_rows,
      window: window[0].total_rows,
      conveyance: conveyance[0].total_rows,
      battery: battery[0].total_rows,
      cubicle: cubicle[0].total_rows,
      genset: genset[0].total_rows,
      lvmdp: lvmdp[0].total_rows,
      panel: panel[0].total_rows,
      rectifier: rectifier[0].total_rows,
      trafo: trafo[0].total_rows,
      ups: ups[0].total_rows,
      extinguish: extinguish[0].total_rows,
      fluid_tank: fluid_tank[0].total_rows,
      furniture: furniture[0].total_rows,
      lighting: lighting[0].total_rows,
      computer: computer[0].total_rows,
      firewalls: firewalls[0].total_rows,
      patch_panels: patch_panels[0].total_rows,
      rack_server: rack_server[0].total_rows,
      routers: routers[0].total_rows,
      storage: storage[0].total_rows,
      switches: switches[0].total_rows,
      pump: pump[0].total_rows,
      safety: safety[0].total_rows,
      alarm: alarm[0].total_rows,
      button: button[0].total_rows,
      cctv: cctv[0].total_rows,
      detector: detector[0].total_rows,
      sound: sound[0].total_rows,
      video_recording: video_recording[0].total_rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
