// This is a generated file! Please edit source .ksy file and use kaitai-struct-compiler to rebuild

import { KaitaiStream } from 'kaitai-struct'

export const ExapunksSolution = (function() {
  ExapunksSolution.WinValueType = Object.freeze({
    CYCLES: 0,
    SIZE: 1,
    ACTIVITY: 2,

    0: "CYCLES",
    1: "SIZE",
    2: "ACTIVITY",
  });

  ExapunksSolution.EditorDisplayStatus = Object.freeze({
    UNROLLED: 0,
    COLLAPSED: 1,

    0: "UNROLLED",
    1: "COLLAPSED",
  });

  ExapunksSolution.MemoryScope = Object.freeze({
    GLOBAL: 0,
    LOCAL: 1,

    0: "GLOBAL",
    1: "LOCAL",
  });

  function ExapunksSolution(_io, _parent, _root) {
    this._io = _io;
    this._parent = _parent;
    this._root = _root || this;

    this._read();
  }
  ExapunksSolution.prototype._read = function() {
    this.magic = this._io.ensureFixedContents([239, 3, 0, 0]);
    this.fileId = new Pstr(this._io, this, this._root);
    this.name = new Pstr(this._io, this, this._root);
    this.competitionWins = this._io.readU4le();
    this.redshiftProgramSize = this._io.readU4le();
    this.winStatsCount = this._io.readU4le();
    this.winStats = new Array(this.winStatsCount);
    for (var i = 0; i < this.winStatsCount; i++) {
      this.winStats[i] = new WinValuePair(this._io, this, this._root);
    }
    this.exaInstancesCount = this._io.readU4le();
    this.exaInstances = new Array(this.exaInstancesCount);
    for (var i = 0; i < this.exaInstancesCount; i++) {
      this.exaInstances[i] = new ExaInstance(this._io, this, this._root);
    }
  }

  var Pstr = ExapunksSolution.Pstr = (function() {
    function Pstr(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    Pstr.prototype._read = function() {
      this.length = this._io.readU4le();
      this.string = KaitaiStream.bytesToStr(this._io.readBytes(this.length), "ASCII");
    }

    return Pstr;
  })();

  var WinValuePair = ExapunksSolution.WinValuePair = (function() {
    function WinValuePair(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    WinValuePair.prototype._read = function() {
      this.type = this._io.readU4le();
      this.value = this._io.readU4le();
    }

    return WinValuePair;
  })();

  var ExaInstance = ExapunksSolution.ExaInstance = (function() {
    function ExaInstance(_io, _parent, _root) {
      this._io = _io;
      this._parent = _parent;
      this._root = _root || this;

      this._read();
    }
    ExaInstance.prototype._read = function() {
      this._unnamed0 = this._io.ensureFixedContents([10]);
      this.name = new Pstr(this._io, this, this._root);
      this.code = new Pstr(this._io, this, this._root);
      this.editorDisplayStatus = this._io.readU1();
      this.memoryScope = this._io.readU1();
      this.bitmap = this._io.readBytes(100);
    }

    return ExaInstance;
  })();

  return ExapunksSolution;
})();
